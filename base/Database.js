import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

class Database {
  static instance = null;

  static getInstance() {
    if (!Database.instance) {
      mongoose.set('strictQuery', true);
      mongoose.connect(process.env.DB_URL, {
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
