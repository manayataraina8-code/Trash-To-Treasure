const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');
const partnerRoutes = require('./routes/partners');
const pickupRoutes = require('./routes/pickups');
const marketplaceRoutes = require('./routes/marketplace');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/trash-to-treasure');

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/items', marketplaceRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/pickups', pickupRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));