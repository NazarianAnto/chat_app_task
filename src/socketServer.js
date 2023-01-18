const DBOperations = require('./DBOperation')
const io = require('socket.io')(3000)

const person = {}

io.on('connection', socket => {

  console.log('SOCKET ID is : ', socket.id);

  socket.on('new_user', fullName => {
    person[socket.id] = fullName
    socket.broadcast.emit('user_connected', fullName)
  })

  socket.on('send_chat_message', async (fullName, message) => {
    const resultInsert = await DBOperations.insert({ name: fullName, message: message })
    socket.broadcast.emit('chat_message', { message: message, fullName: fullName })
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('user_disconnected', person[socket.id])
    console.log("user disconected: ", person[socket.id]);
  })
})

const utilSocketIo = {
  startSocket: () => {
    console.log(`Server is listening on ${process.env.HOST}:${process.env.SOCKET_PORT}...Socket`);
  }
}

module.exports = utilSocketIo