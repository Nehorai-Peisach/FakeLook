const authDatabaseService = require('./authDatabaseService');

module.exports = async (userInfo) => await authDatabaseService('sign-up', userInfo);
