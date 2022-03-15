const developLogger = require('./developLogger');
const productionLogger = require('./productionLogger');

let logger = developLogger();

// if (process.env.NODE_ENV === 'production') {
//   logger = productionLogger();
// }
// if (process.env.NODE_ENV !== 'production') {
//   logger = developLogger();
// }
module.exports = logger;
