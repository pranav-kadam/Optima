const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./utils/db');
const app = express();
app.use(express.json());
app.use(cors());

// Register route
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate role (ensure it's a valid role)
    const validRoles = ['salesman', 'admin', 'accountant']; // Add roles as needed
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users (email, password_hash, role, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id',
      [email, hashedPassword, role]
    );
    res.status(201).json({ message: 'User registered successfully', userId: result.rows[0].id });
  } catch (error) {
    console.error(error);
    if (error.code === '23505') { // unique_violation error code
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Include the role in the JWT payload
    const token = jwt.sign({ userId: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Middleware to authenticate JWT and extract user role
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.userId = user.userId;
    req.role = user.role; // Extract role from JWT
    next();
  });
}

// Middleware to authorize roles
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
}

// Example of a protected route that only 'admin' can access
app.get('/api/admin', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  res.json({ message: 'Welcome Admin' });
});

// Example of a route accessible by both 'admin' and 'manager'
app.get('/api/manager-or-admin', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  res.json({ message: 'Welcome Manager or Admin' });
});

// Example of a general protected route
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const result = await db.query('SELECT email, role FROM users WHERE id = $1', [req.userId]);
    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ email: user.email, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
