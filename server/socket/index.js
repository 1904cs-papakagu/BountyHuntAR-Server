module.exports = io => {
  io.on('connection', socket => {
    console.log(`A player has connected: ${socket.id}`)

    socket.on('join', function(locationId, userId, displacement) {
      socket.join(locationId)
      io.sockets.in(locationId).emit('agentUpdate', userId, displacement)
    })

    socket.on('updateAgent', function(locationId, userId, transform) {
      io.sockets.in(locationId).emit('agentUpdate', userId, transform)
    })

    socket.on('killTarget', function(locationId, userId) {
      io.sockets.in(locationId).emit('targetKilled', `${userId}`)
    })

    socket.on('killAgent', function(locationId, userId) {
      io.sockets.in(locationId).emit('agentKilled', userId)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
