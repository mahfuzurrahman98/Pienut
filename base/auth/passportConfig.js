import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import Database from '../Database.js';

const db = Database.getInstance();
const users = db.connection.collection('users');

const initializePassport = (passport) => {
  const authenticateUser = async (email, password, done) => {
    const user = await users.findOne({ email: email });

    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    bcrypt.compare(password, user.password, function (err, res) {
      if (res) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

  passport.serializeUser((user, done) => {
    console.log('serializing: ', user);
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log('deserializing: ', id);
    try {
      // convert id to mongo ObjectId
      id = db.Types.ObjectId(id);
      console.log('obejct id: ', id);
      let user = await users.findOne({ _id: id });
      console.log('deserialized user: ', user);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });

  // passport.deserializeUser((id, done) => {
  //   User.findById(id, (err, user) => {
  //     done(err, user);
  //   });
  // });
};

export default initializePassport;
