const GameRoom = require('./GameRoom')
const {EVENTS,MESSAGES} = require('./GameStatics')

const rooms = [
	{
		name: 'test1',
		id: 123,
		instance: new GameRoom(123)
	}
]

function eventsListener(socket) {
	socket.on(EVENTS.JOIN_TO_ROOM, (data) => {
		const roomName = data.roomName
		const room = rooms.find( element => element.name === roomName)

		if(!room)
			return socket.emit(EVENTS.INFO,{msg: MESSAGES.ERRORS.ROOM_NOT_EXISTS})
		
		return room.instance[EVENTS.JOIN_TO_ROOM](socket)
	})
}

module.exports = {
	initListeners: eventsListener
}