const server = require('http').createServer(handler)
const io = require('socket.io')(server)

const gameController = require('./GameConnection/GameController')

const logger = require('./logger')
const config = require('./config.json')

function handler(request,response) {
	response.end('Hello World')
}

io.on('connection', (socket) => {
	socket.emit('connected',{msg: 'Polaczono z serwerem'})
	gameController.initListeners(socket)
})



const serverPort = config['server']['port']
server.listen(serverPort)
logger.info('Server started on port '+serverPort)