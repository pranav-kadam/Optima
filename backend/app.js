const express = require('express');
const dotenv = require('dotenv');
const db = require('./utils/db');

dotenv.config(); 

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('ERP Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
