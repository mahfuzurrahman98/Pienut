import express from "express";
// import UserController from "./controllers/UserController.js";
import User from "./models/User.js";
const app = express();

// const uc = new UserController();

const PORT = process.env.PORT || 4000;


app.get('/', (req, res) => {
  // var userModel = db.model('users', new db.Schema(userSchema));

  User.find().then((resd) => {
    res.send(resd);
  });
});


app.listen(PORT, () => {
  console.log('the app is running on port ', PORT);
});
