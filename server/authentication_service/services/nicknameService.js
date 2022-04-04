const authDatabaseService = require('./authDatabaseService');

module.exports = async (userInfo) => await authDatabaseService('nickname', userInfo);
