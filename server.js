import bodyParser from "body-parser";
import express from "express";
import v1Routes from './routes/api/v1/index.js';
import v2Routes from './routes/api/v2/index.js';

const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mount the api/v1 routes to the '/v1' prefix
const v1Router = express.Router();
v1Routes(v1Router), app.use('/api/v1', v1Router);


// Mount the api/v2 routes to the '/v2' prefix
app.use('/api/v2', v2Routes);


// listen the server at PORT
app.listen(PORT, () => {
  console.log('the app is running on port ', PORT);
});
