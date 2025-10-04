#!/bin/bash

echo "🚀 Setting up Trash-to-Treasure..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend/api && npm install
cd ../ml-service && npm install
cd ../..

# Install frontend dependencies
echo "📱 Installing mobile app dependencies..."
cd frontend/mobile && npm install
cd ../web && npm install
cd ../..

# Create environment files
echo "⚙️ Creating environment files..."
cp backend/api/.env.example backend/api/.env

# Start MongoDB (if using Docker)
echo "🗄️ Starting MongoDB..."
docker run -d --name trash-to-treasure-mongo -p 27017:27017 mongo:latest || echo "MongoDB already running or Docker not available"

# Seed database
echo "🌱 Seeding database..."
cd backend/api && node ../../database/seeds/partners.js
cd ../..

echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "1. Backend API: cd backend/api && npm run dev"
echo "2. ML Service: cd backend/ml-service && npm start"
echo "3. Web App: cd frontend/web && npm start"
echo "4. Mobile App: cd frontend/mobile && npm start"