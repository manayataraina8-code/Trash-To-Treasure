const fs = require('fs-extra');
const path = require('path');

let modelData = null;

// Load the trained model
async function loadModel() {
  try {
    const modelPath = path.join(__dirname, '../models/simple_model.json');
    
    if (await fs.pathExists(modelPath)) {
      modelData = await fs.readJSON(modelPath);
      console.log('✅ Smart AI model loaded successfully');
    } else {
      console.log('⚠️ No trained model found. Training new model...');
      await require('../training/simple_train').trainSimpleModel();
      modelData = await fs.readJSON(modelPath);
    }
  } catch (error) {
    console.log('⚠️ Failed to load model:', error.message);
  }
}

// Smart classification using keyword matching
function classifyWithKeywords(text) {
  if (!modelData) return null;
  
  const lowerText = text.toLowerCase();
  const scores = {};
  
  // Score each category based on keyword matches
  for (const [category, keywords] of Object.entries(modelData.categories)) {
    scores[category] = 0;
    
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        // Give higher score for exact matches
        if (lowerText === keyword) {
          scores[category] += 10;
        } else if (lowerText.startsWith(keyword) || lowerText.endsWith(keyword)) {
          scores[category] += 5;
        } else {
          scores[category] += 2;
        }
      }
    }
  }
  
  // Find category with highest score
  const maxCategory = Object.keys(scores).reduce((a, b) => 
    scores[a] > scores[b] ? a : b
  );
  
  const maxScore = scores[maxCategory];
  const confidence = Math.min(maxScore / 10, 1.0); // Normalize to 0-1
  
  return {
    category: maxCategory,
    confidence,
    scores
  };
}

// Determine quality/condition
function determineCondition(text) {
  if (!modelData) return 'good';
  
  const lowerText = text.toLowerCase();
  
  for (const [condition, keywords] of Object.entries(modelData.qualityKeywords)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        return condition;
      }
    }
  }
  
  return 'good'; // default
}

// Main classification function
async function classifyImage(imageUrl) {
  try {
    // Extract filename without extension
    const filename = path.basename(imageUrl, path.extname(imageUrl));
    const text = filename.replace(/[_-]/g, ' ');
    
    // Classify using keywords
    const result = classifyWithKeywords(text);
    
    if (!result || result.confidence < 0.1) {
      // Fallback to basic classification
      return {
        category: 'furniture',
        condition: 'good',
        estimatedValue: 30,
        confidence: 0.5,
        aiPowered: false
      };
    }
    
    // Determine condition
    const condition = determineCondition(text);
    
    // Calculate value
    const baseValues = {
      electronics: 65, furniture: 85, clothing: 35,
      books: 15, toys: 25, kitchenware: 45
    };
    
    const conditionMultipliers = {
      excellent: 2.5, good: 2.0, fair: 1.3, poor: 0.6
    };
    
    const baseValue = baseValues[result.category] || 40;
    const estimatedValue = Math.round(baseValue * conditionMultipliers[condition]);
    
    return {
      category: result.category,
      condition,
      estimatedValue,
      confidence: result.confidence,
      aiPowered: true,
      keywordMatches: result.scores
    };
    
  } catch (error) {
    throw new Error('Classification failed: ' + error.message);
  }
}

// Initialize model on startup
loadModel();

module.exports = { classifyImage, loadModel };