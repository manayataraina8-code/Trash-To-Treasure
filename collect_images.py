#!/usr/bin/env python3
import os
import requests
from urllib.parse import urlparse

# Sample image URLs (you can replace with your own)
sample_images = {
    'electronics': [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',  # phone
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',  # laptop
        'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400',  # tablet
    ],
    'furniture': [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',  # chair
        'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400',  # table
        'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400',  # desk
    ],
    'clothing': [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',  # shirt
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',  # dress
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',  # jacket
    ],
    'books': [
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',  # books
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',  # textbook
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',  # magazine
    ],
    'toys': [
        'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400',  # toys
        'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400',  # puzzle
        'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',  # doll
    ],
    'kitchenware': [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',  # pot
        'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400',  # pan
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',  # plates
    ]
}

def download_image(url, filepath):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        with open(filepath, 'wb') as f:
            f.write(response.content)
        print(f"✅ Downloaded: {filepath}")
        return True
    except Exception as e:
        print(f"❌ Failed to download {url}: {e}")
        return False

def collect_training_images():
    base_dir = "backend/ml-service/data"
    
    for category, urls in sample_images.items():
        category_dir = os.path.join(base_dir, category)
        os.makedirs(category_dir, exist_ok=True)
        
        print(f"\n📁 Collecting {category} images...")
        
        for i, url in enumerate(urls):
            filename = f"{category}_{i+1}.jpg"
            filepath = os.path.join(category_dir, filename)
            download_image(url, filepath)
    
    print("\n🎉 Sample images collected!")
    print("Add more images to improve accuracy:")
    for category in sample_images.keys():
        print(f"  - {base_dir}/{category}/")

if __name__ == "__main__":
    collect_training_images()