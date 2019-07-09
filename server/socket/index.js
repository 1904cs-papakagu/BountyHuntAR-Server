
module.exports = io => {
  io.on('connection', socket => {
    console.log(`A player has connected: ${socket.id}`)

    socket.on('join', function(locationId, userId, displacement) {
      socket.join(locationId)
      io.sockets.in(locationId).emit('agentUpdate', userId, displacement)
    })

    socket.on('updateAgent', function(locationId, userId, transform) {
      try {
        io.sockets
          .in(locationId)
          .emit('agentUpdate', userId, transform)
      } catch (err) {
        console.log('updateAgent rejected')
      }
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
