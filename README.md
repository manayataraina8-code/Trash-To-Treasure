# Trash-to-Treasure

AI-powered waste-to-value platform connecting users with local upcyclers, NGOs, and makers.

## How it works
1. Take a photo of an item you no longer need
2. AI classifies the item and finds local partners
3. Schedule pickup with matched upcyclers/NGOs
4. Earn tokens or cash rewards

## Folder Structure

```
trash-to-treasure/
├── frontend/
│   ├── mobile/                 # React Native app
│   │   ├── src/
│   │   │   ├── components/     # Reusable UI components
│   │   │   ├── screens/        # App screens (Camera, Profile, etc.)
│   │   │   ├── services/       # API calls, auth
│   │   │   ├── utils/          # Helper functions
│   │   │   └── assets/         # Images, icons
│   │   ├── android/            # Android-specific code
│   │   └── ios/                # iOS-specific code
│   └── web/                    # React web dashboard
│       ├── src/
│       │   ├── components/     # UI components
│       │   ├── pages/          # Web pages
│       │   ├── services/       # API integration
│       │   ├── utils/          # Utilities
│       │   └── assets/         # Static assets
│       └── public/             # Public files
├── backend/
│   ├── api/                    # Main API service
│   │   ├── src/
│   │   │   ├── controllers/    # Route handlers
│   │   │   ├── models/         # Database models
│   │   │   ├── routes/         # API routes
│   │   │   ├── middleware/     # Auth, validation
│   │   │   └── utils/          # Helper functions
│   │   └── config/             # Database, env config
│   ├── ml-service/             # AI classification service
│   │   ├── src/
│   │   │   ├── models/         # ML models
│   │   │   ├── preprocessing/  # Image processing
│   │   │   └── training/       # Model training scripts
│   │   └── data/               # Training datasets
│   └── notification-service/   # Push notifications
│       ├── src/
│       │   ├── controllers/    # Notification handlers
│       │   └── services/       # Email, SMS, push
│       └── config/             # Service configuration
├── database/
│   ├── migrations/             # Database schema changes
│   └── seeds/                  # Sample data
├── infrastructure/
│   ├── docker/                 # Docker configurations
│   ├── k8s/                    # Kubernetes manifests
│   └── terraform/              # Infrastructure as code
├── tests/
│   ├── unit/                   # Unit tests
│   ├── integration/            # Integration tests
│   └── e2e/                    # End-to-end tests
├── scripts/                    # Build and deployment scripts
└── docs/                       # Documentation
```

## Tech Stack
- Frontend: React Native (mobile) + React (web)
- Backend: Node.js/Express
- AI: TensorFlow/PyTorch for image classification
- Database: PostgreSQL + Redis
- Cloud: AWS/GCP for image storage and ML