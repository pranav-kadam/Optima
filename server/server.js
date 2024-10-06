const express = require('express');
const { connectDB } = require('./app/config/dbConfig');
const Accounting = require('./app/models/Accounting');

const app = express();
app.use(express.json());

connectDB();

Accounting.sync({ force: false })  // Ensures the table exists
  .then(() => console.log('Accounting table synced'))
  .catch((err) => console.error('Error syncing table', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const accountingRoutes = require('./app/routes/accountingRoutes');

app.use('/api/accounting', accountingRoutes);
