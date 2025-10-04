const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const usersFile = path.join(__dirname, 'users.json');

// Initialize users file if it doesn't exist
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([]));
}

// Register route
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, location } = req.body;
    
    // Read existing users
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name,
      location,
      tokens: 0,
      totalEarnings: 0,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    
    const token = jwt.sign({ id: newUser.id }, 'secret-key');
    res.status(201).json({ 
      token, 
      user: { id: newUser.id, email, name },
      message: 'Registration successful!'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    const user = users.find(u => u.email === email);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.id }, 'secret-key');
    res.json({ 
      token, 
      user: { id: user.id, email: user.email, name: user.name },
      message: 'Login successful!'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users (for testing)
app.get('/api/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
  const safeUsers = users.map(u => ({ id: u.id, email: u.email, name: u.name, createdAt: u.createdAt }));
  res.json(safeUsers);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log('📝 Registration endpoint: POST /api/auth/register');
  console.log('🔐 Login endpoint: POST /api/auth/login');
});