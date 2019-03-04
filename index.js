const server = require('http').createServer(handler)
const io = require('socket.io')(server)

function handler(request,response) {
	response.end('Hello World')
}

io.on('connection', (socket) => {
    console.log('Polaczenie')
    socket.emit('connected',{msg: 'Polaczono z serwerem'})
    
    socket.on('message', (data) =>{
        socket.emit('message', {msg: 'Hello from Socket.io'})
        console.log(data)
    })
})

server.listen(3000)
