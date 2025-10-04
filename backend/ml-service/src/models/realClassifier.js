const tf = require('@tensorflow/tfjs-node');
const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');

let model = null;
let categories = [];

// Load the trained model
async function loadModel() {
  try {
    const modelPath = path.join(__dirname, '../models/trash_classifier');
    
    if (await fs.pathExists(modelPath)) {
      model = await tf.loadLayersModel(`file://${modelPath}/model.json`);
      categories = await fs.readJSON(path.join(modelPath, 'categories.json'));
      console.log('✅ AI model loaded successfully');
    } else {
      console.log('⚠️ No trained model found. Using fallback classification.');
    }
  } catch (error) {
    console.log('⚠️ Failed to load model:', error.message);
  }
}

// Preprocess image for model
async function preprocessImage(imageBuffer) {
  const processedImage = await sharp(imageBuffer)
    .resize(224, 224)
    .removeAlpha()
    .raw()
    .toBuffer();
  
  // Convert to tensor and normalize
  const tensor = tf.tensor3d(new Uint8Array(processedImage), [224, 224, 3])
    .div(255.0)
    .expandDims(0);
  
  return tensor;
}

// Classify image using real AI model
async function classifyWithAI(imageBuffer) {
  if (!model) {
    throw new Error('Model not loaded');
  }
  
  const imageTensor = await preprocessImage(imageBuffer);
  const predictions = model.predict(imageTensor);
  const probabilities = await predictions.data();
  
  // Get the category with highest probability
  const maxIndex = probabilities.indexOf(Math.max(...probabilities));
  const category = categories[maxIndex];
  const confidence = probabilities[maxIndex];
  
  // Clean up tensors
  imageTensor.dispose();
  predictions.dispose();
  
  return {
    category,
    confidence,
    probabilities: Object.fromEntries(
      categories.map((cat, i) => [cat, probabilities[i]])
    )
  };
}

// Fallback classification (improved version)
function fallbackClassify(imageUrl) {
  const filename = imageUrl.toLowerCase();
  let category = 'furniture';
  
  if (filename.includes('phone') || filename.includes('laptop') || filename.includes('computer')) {
    category = 'electronics';
  } else if (filename.includes('shirt') || filename.includes('clothes') || filename.includes('dress')) {
    category = 'clothing';
  } else if (filename.includes('book') || filename.includes('novel')) {
    category = 'books';
  } else if (filename.includes('toy') || filename.includes('game')) {
    category = 'toys';
  } else if (filename.includes('pot') || filename.includes('kitchen')) {
    category = 'kitchenware';
  }
  
  return {
    category,
    confidence: 0.75,
    probabilities: { [category]: 0.75 }
  };
}

// Main classification function
async function classifyImage(imageUrl, imageBuffer = null) {
  try {
    let result;
    
    if (model && imageBuffer) {
      // Use real AI model
      result = await classifyWithAI(imageBuffer);
    } else {
      // Use fallback
      result = fallbackClassify(imageUrl);
    }
    
    // Determine condition based on confidence
    let condition = 'good';
    if (result.confidence > 0.9) condition = 'excellent';
    else if (result.confidence < 0.6) condition = 'fair';
    else if (result.confidence < 0.4) condition = 'poor';
    
    // Calculate value
    const baseValues = {
      electronics: 45, furniture: 75, clothing: 25,
      books: 12, toys: 18, kitchenware: 35
    };
    
    const conditionMultipliers = {
      excellent: 2.2, good: 1.8, fair: 1.2, poor: 0.5
    };
    
    const baseValue = baseValues[result.category] || 30;
    const estimatedValue = Math.round(baseValue * conditionMultipliers[condition]);
    
    return {
      category: result.category,
      condition,
      estimatedValue,
      confidence: result.confidence,
      aiPowered: !!model
    };
    
  } catch (error) {
    throw new Error('Classification failed: ' + error.message);
  }
}

// Initialize model on startup
loadModel();

module.exports = { classifyImage, loadModel };