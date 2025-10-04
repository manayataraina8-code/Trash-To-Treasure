#!/bin/bash

echo "📁 Creating sample image files for testing..."

cd backend/ml-service/data

# Create sample files with descriptive names
echo "Creating electronics samples..."
touch electronics/old_iphone.jpg electronics/broken_laptop.jpg electronics/gaming_console.jpg

echo "Creating furniture samples..."
touch furniture/wooden_chair.jpg furniture/office_desk.jpg furniture/dining_table.jpg

echo "Creating clothing samples..."
touch clothing/vintage_dress.jpg clothing/cotton_shirt.jpg clothing/denim_jacket.jpg

echo "Creating books samples..."
touch books/cooking_book.jpg books/history_textbook.jpg books/fiction_novel.jpg

echo "Creating toys samples..."
touch toys/kids_puzzle.jpg toys/stuffed_doll.jpg toys/board_game.jpg

echo "Creating kitchenware samples..."
touch kitchenware/steel_pot.jpg kitchenware/ceramic_plate.jpg kitchenware/glass_cup.jpg

echo "✅ Sample files created! Replace these empty files with real images."
echo "💡 Tip: Use descriptive filenames like 'old_laptop.jpg' or 'vintage_chair.png'"