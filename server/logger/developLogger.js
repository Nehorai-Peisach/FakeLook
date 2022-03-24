const { createLogger, format, transports, debug } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

const developLogger = () => {
  return createLogger({
    level: process.env.LOG_LEVEL || 'silly',
    format: combine(format.colorize(), timestamp({ format: 'HH:mm:ss' }), myFormat),
    transports: [new transports.Console()],
  });
};

module.exports = developLogger;
