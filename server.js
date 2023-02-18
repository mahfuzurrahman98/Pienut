import bodyParser from "body-parser";
import dotenv from 'dotenv';
import express from "express";
import v1Routes from './routes/api/v1/index.js';

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mount the api/v1 routes to the '/v1' prefix
app.use('/api/v1', v1Routes);


// listen the server at PORT
app.listen(PORT, () => {
  console.log(`the server is running on port ${PORT}`);
});
