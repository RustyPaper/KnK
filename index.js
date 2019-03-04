const server = require('http').createServer(handler)
const io = require('socket.io')(server)

const logger = require('./logger')
const config = require('./config.json')

function handler(request,response) {
	response.end('Hello World')
}

io.on('connection', (socket) => {
	socket.emit('connected',{msg: 'Polaczono z serwerem'})

	socket.on('message', (data) =>{
		socket.emit('message', {msg: 'Hello from Socket.io'})
		logger.info(data)
	})
})
const serverPort = config['server']['port']
server.listen(serverPort)
logger.info('Server started on port '+serverPort)