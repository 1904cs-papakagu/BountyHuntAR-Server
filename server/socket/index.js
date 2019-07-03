module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('join', function(room) {
      console.log(`${socket.id} joined ${room}!`)
      socket.join(room)
    })

    socket.on('killTarget', function(room) {
      io.sockets.in(room).emit('targetKilled')
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
