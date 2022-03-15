const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

module.exports = class MongoDb {
  constructor() {
    this.uri = DB_URL;
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
