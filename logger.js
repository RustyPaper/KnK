const winston = require('winston')
const config = require('./config.json')
const fs = require('fs')
const path = require('path')

const logsDirectoryPath = path.join(process.cwd(), config['logDirectory'])

if (!fs.existsSync(logsDirectoryPath)) fs.mkdirSync( logsDirectoryPath )

function onlyLevel(level){
	return winston.format((log) => {
		if (log['level'] === level)
			return log
	})()
}

const logFormat = winston.format.printf(({timestamp, message}) => `${timestamp}    ${message}`)

const logger = winston.createLogger({
	transports: [
		new winston.transports.File({
			filename: path.join(logsDirectoryPath,'infos.log'),
			level: 'info',
			format:  winston.format.combine(
				winston.format.timestamp(),
				onlyLevel('info'),
				logFormat
			)
		}),

		new winston.transports.File({
			filename: path.join(logsDirectoryPath,'errors.log'),
			level: 'error',
			format:  winston.format.combine(
				winston.format.timestamp(),
				onlyLevel('error'),
				logFormat
			)
		})   
	]
})

if (config['devMode']) {
	logger.add(new winston.transports.Console({
		format: winston.format.simple()
	}))
}

module.exports = logger