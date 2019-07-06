module.exports = io => {
  io.on('connection', socket => {
    console.log(`A player has connected: ${socket.id}`)

    const allAgents = {}

    function agentPosition({displacement, transform}) {
      return transform.reduce((pos, comp, index) => {
        pos.push(comp - displacement[index])
      }, [])
    }

    socket.on('join', function(locationId, userId, displacement) {
      const newAgent = {displacement, transform: [0, 0, 0]}
      if (allAgents[locationId]) {
        const room = allAgents[locationId]
        room[userId] = newAgent
      } else {
        const room = {}
        room[userId] = newAgent
        allAgents[locationId] = room
      }
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
