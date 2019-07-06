const allAgents = {
  1: {},
  2: {},
  3: {}
}

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A player has connected: ${socket.id}`)

    function agentPosition({displacement, transform}) {
      return transform.map((comp, i) => comp - displacement[i])
    }

    socket.on('join', function(locationId, userId, displacement) {
      const newAgent = {displacement, transform: [0, 0, 0]}
      const room = allAgents[locationId]
      room[userId] = newAgent
      console.log('All online agents:', allAgents)
      socket.join(locationId)
      io.sockets.in(locationId).emit('agentUpdate', displacement)
    })

    socket.on('updateAgent', function(locationId, userId, transform) {
      const room = allAgents[locationId]
      room[userId].transform = transform
      console.log('All online agents:', allAgents)

      io.sockets
        .in(locationId)
        .emit('agentUpdate', userId, agentPosition(room[userId]))
    })

    socket.on('killTarget', function(locationId, userId) {
      console.log(
        `the target in room ${locationId} has been killed by User #${userId}`
      )
      io.sockets.in(locationId).emit('targetKilled', `${userId}`)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
