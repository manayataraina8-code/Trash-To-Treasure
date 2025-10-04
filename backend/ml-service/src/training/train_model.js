const tf = require('@tensorflow/tfjs-node');
const fs = require('fs-extra');
const path = require('path');

// Categories for classification
const CATEGORIES = ['electronics', 'furniture', 'clothing', 'books', 'toys', 'kitchenware'];

// Create a simple CNN model
function createModel() {
  const model = tf.sequential({
    layers: [
      tf.layers.conv2d({
        inputShape: [224, 224, 3],
        filters: 32,
        kernelSize: 3,
        activation: 'relu'
      }),
      tf.layers.maxPooling2d({ poolSize: 2 }),
      tf.layers.conv2d({ filters: 64, kernelSize: 3, activation: 'relu' }),
      tf.layers.maxPooling2d({ poolSize: 2 }),
      tf.layers.conv2d({ filters: 128, kernelSize: 3, activation: 'relu' }),
      tf.layers.maxPooling2d({ poolSize: 2 }),
      tf.layers.flatten(),
      tf.layers.dropout({ rate: 0.5 }),
      tf.layers.dense({ units: 128, activation: 'relu' }),
      tf.layers.dense({ units: CATEGORIES.length, activation: 'softmax' })
    ]
  });

  model.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  });

  return model;
}

// Generate synthetic training data (replace with real images)
function generateTrainingData() {
  const numSamples = 100;
  const imageSize = 224;
  
  // Create random image data
  const images = tf.randomNormal([numSamples, imageSize, imageSize, 3]);
  
  // Create random labels
  const labels = tf.oneHot(
    tf.randomUniform([numSamples], 0, CATEGORIES.length, 'int32'),
    CATEGORIES.length
  );
  
  return { images, labels };
}

async function trainModel() {
  console.log('🤖 Creating model...');
  const model = createModel();
  
  console.log('📊 Generating training data...');
  const { images, labels } = generateTrainingData();
  
  console.log('🏋️ Training model...');
  await model.fit(images, labels, {
    epochs: 5,
    batchSize: 32,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc.toFixed(4)}`);
      }
    }
  });
  
  console.log('💾 Saving model...');
  const modelPath = path.join(__dirname, '../models/trash_classifier');
  await fs.ensureDir(modelPath);
  await model.save(`file://${modelPath}`);
  
  // Save category mapping
  await fs.writeJSON(path.join(modelPath, 'categories.json'), CATEGORIES);
  
  console.log('✅ Model trained and saved!');
  
  // Clean up
  images.dispose();
  labels.dispose();
  model.dispose();
}

if (require.main === module) {
  trainModel().catch(console.error);
}

module.exports = { trainModel, CATEGORIES };