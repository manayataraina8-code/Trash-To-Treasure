const fs = require('fs-extra');
const path = require('path');

// Simple keyword-based training data
const trainingData = {
  electronics: [
    'phone', 'laptop', 'computer', 'tablet', 'tv', 'monitor', 'keyboard', 'mouse',
    'headphones', 'speaker', 'camera', 'charger', 'cable', 'router', 'printer',
    'smartphone', 'iphone', 'android', 'macbook', 'pc', 'gaming', 'console'
  ],
  furniture: [
    'chair', 'table', 'desk', 'sofa', 'couch', 'bed', 'dresser', 'cabinet',
    'shelf', 'bookshelf', 'wardrobe', 'nightstand', 'ottoman', 'bench', 'stool',
    'dining', 'office', 'bedroom', 'living', 'wooden', 'metal', 'glass'
  ],
  clothing: [
    'shirt', 'pants', 'dress', 'jacket', 'coat', 'sweater', 'jeans', 'skirt',
    'blouse', 'hoodie', 'shorts', 'socks', 'shoes', 'boots', 'sneakers',
    'vintage', 'designer', 'cotton', 'wool', 'denim', 'leather', 'silk'
  ],
  books: [
    'book', 'novel', 'textbook', 'magazine', 'journal', 'encyclopedia', 'dictionary',
    'cookbook', 'manual', 'guide', 'fiction', 'non-fiction', 'biography',
    'history', 'science', 'art', 'children', 'comic', 'paperback', 'hardcover'
  ],
  toys: [
    'toy', 'doll', 'action', 'figure', 'puzzle', 'game', 'board', 'lego',
    'blocks', 'stuffed', 'plush', 'car', 'truck', 'train', 'robot',
    'children', 'kids', 'baby', 'educational', 'electronic', 'wooden'
  ],
  kitchenware: [
    'pot', 'pan', 'plate', 'bowl', 'cup', 'mug', 'glass', 'knife', 'fork',
    'spoon', 'blender', 'mixer', 'toaster', 'microwave', 'kettle', 'cutting',
    'kitchen', 'cooking', 'dining', 'utensil', 'appliance', 'ceramic', 'steel'
  ]
};

// Quality indicators
const qualityKeywords = {
  excellent: ['new', 'mint', 'perfect', 'excellent', 'pristine', 'unused', 'boxed'],
  good: ['good', 'working', 'functional', 'clean', 'nice', 'decent'],
  fair: ['used', 'worn', 'fair', 'some', 'minor', 'scratches', 'marks'],
  poor: ['broken', 'damaged', 'cracked', 'torn', 'stained', 'repair', 'parts']
};

async function trainSimpleModel() {
  console.log('🤖 Training simple AI classifier...');
  
  const modelData = {
    categories: trainingData,
    qualityKeywords,
    version: '1.0',
    trainedAt: new Date().toISOString()
  };
  
  const modelPath = path.join(__dirname, '../models');
  await fs.ensureDir(modelPath);
  await fs.writeJSON(path.join(modelPath, 'simple_model.json'), modelData, { spaces: 2 });
  
  console.log('✅ Simple AI model trained and saved!');
  console.log(`📊 Categories: ${Object.keys(trainingData).length}`);
  console.log(`🔤 Keywords: ${Object.values(trainingData).flat().length}`);
}

if (require.main === module) {
  trainSimpleModel().catch(console.error);
}

module.exports = { trainSimpleModel };