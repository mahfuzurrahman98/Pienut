import dotenv from 'dotenv';
import app from './src/App.js';

const PORT = process.env.PORT || 4000;

dotenv.config();

app.listen(PORT, () => {
  console.log(`Pienut dev server is running on PORT: ${PORT}`);
});
