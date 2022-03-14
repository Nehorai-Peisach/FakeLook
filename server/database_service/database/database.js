const mongoose = require('mongoose');

module.exports = class MongoDb {
  constructor() {
    this.uri = 'mongodb+srv://admin:admin123@maincluster.rebcv.mongodb.net/FakeLookDb?retryWrites=true&w=majority';
  }

  connect() {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => reject(error));
    });
  }
};
