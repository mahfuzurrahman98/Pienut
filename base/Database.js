// db.js

import mongoose from 'mongoose';

class Database {
  static instance = null;

  static getInstance() {
    if (!Database.instance) {
      mongoose.set('strictQuery', true);
      mongoose.connect('mongodb://localhost:27017/wetube', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('Connected to MongoDB');
      }).catch((err) => {
        console.log(err);
      });

      Database.instance = mongoose;
    }

    return Database.instance;
  }
}

export default Database;
