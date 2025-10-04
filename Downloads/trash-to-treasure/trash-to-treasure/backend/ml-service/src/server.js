const express = require('express');
const cors = require('cors');
const { classifyImage } = require('./models/debugClassifier');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/classify', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const result = await classifyImage(imageUrl);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`ML Service running on port ${PORT}`));