
const {EVENTS} = require('./GameStatics')

class GameRoom {
	constructor(id) {
		this.roomId = id
		this.players=[]
	}

	[EVENTS.JOIN_TO_ROOM](socket){
		if(this.players.length > 2)
			return socket.emit('info',{msg: 'Maksymalna ilość uzytkownikow'})
		this.players.push(socket)
		socket.join(this.roomId)
		return socket.emit(EVENTS.JOIN_TO_ROOM,{roomId : this.roomId})
	}

	[EVENTS.UPDATE_STATE](socket){
		socket.broadcast.emit('updateState',{state: `broadcast Test room : ${this.roomName}`})
	}
}

module.exports = GameRoom