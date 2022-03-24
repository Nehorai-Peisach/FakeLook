// const productionLogger = require('./productionLogger');
const developLogger = require('./developLogger');
const myLog = developLogger();

class logger {
  error = (data = '', path = '', message = '') => myLog.error(path + ':\t' + message + '\n' + data + '\n');
  warn = (data = '', path = '', message = '') => myLog.warn(path + ':\t' + message + '\n' + data + '\n');
  info = (data = '', path = '', message = '') => myLog.info(path + ':\t' + message + '\n' + data + '\n');
  http = (data = '', path = '', message = '') => myLog.http(path + ':\t' + message + '\n' + data + '\n');
  verbose = (data = '', path = '', message = '') => myLog.verbose(path + ':\t' + message + '\n' + data + '\n');
  debug = (data = '', path = '', message = '') => myLog.debug(path + ':\t' + message + '\n' + data + '\n');
  silly = (data = '', path = '', message = '') => myLog.silly(path + ':\t' + message + '\n' + data + '\n');
}

// if (process.env.NODE_ENV === 'production') {
//   logger = productionLogger();
// }
// if (process.env.NODE_ENV !== 'production') {
//   logger = developLogger();
// }
module.exports = new logger();
