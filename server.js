import dotenv from 'dotenv';
import app from './src/App.js';

const PORT = process.env.PORT || 4000;

dotenv.config();

app.listen(PORT, () => {
  console.log(`the server is running on port ${PORT}`);
});
