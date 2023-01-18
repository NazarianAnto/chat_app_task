const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const fullName = prompt('What is your fullName?')

appendMessage('You joined')
socket.emit('new_user', fullName)

socket.on('chat_message', data => {
  appendMessage(`${data.fullName}: ${data.message}`)
})

socket.on('user_connected', fullName => {
  appendMessage(`${fullName} connected`)
})

socket.on('user_disconnected', fullName => {
  appendMessage(`${fullName} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send_chat_message', fullName , message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}