// app.js
const express = require('express');
const dotenv = require('dotenv');
const accountantRoutes = require('./routes/accountantRoute');

/* const salesmanRoutes = require('./routes/salesmanRoutes');
const qaRoutes = require('./routes/qaRoutes');
const hrRoutes = require('./routes/hrRoutes');
const customerServiceRoutes = require('./routes/customerServiceRoutes');
*/
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Register role-specific routes
app.use('/api/accountants', accountantRoutes);
/*
app.use('/api/salesmen', salesmanRoutes);
app.use('/api/qa', qaRoutes);
app.use('/api/hr', hrRoutes);
app.use('/api/customerservice', customerServiceRoutes);
*/
app.get('/', (req, res) => {
  res.send('ERP Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
