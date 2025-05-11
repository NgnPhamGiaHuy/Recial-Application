# 🌐 Recial

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb)
![Redux](https://img.shields.io/badge/Redux-5.0.0-purple?logo=redux)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0.0-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-Private-red)

</div>

## 📝 Description

Recial is a full-stack social media platform built with modern web technologies. The application provides a comprehensive suite of features for social networking, content sharing, and real-time communication. Designed with scalability and performance in mind, Recial delivers a seamless user experience across devices.

## ✨ Features

- **Authenticate** users via Google OAuth, JWT tokens, and secure password handling
- **Connect** with friends through a robust request and approval system
- **Share** posts with text, images, and videos to your personal feed
- **Create** and manage groups, pages, and events with dedicated feeds
- **Communicate** in real-time through WebSocket-powered messaging
- **Receive** instant notifications for social interactions
- **Customize** user profiles with personal information and preferences
- **Discover** content through intelligent suggestion algorithms
- **Manage** privacy settings with granular control options

## 🖼️ Screenshots

<div align="center">

| Interface | Preview |
|-----------|---------|
| Login | ![Login Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/a46f0f30-dc25-4399-aa17-9f37b1cfdc17) |
| User Landing | ![User Landing Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/5cfb103a-19f0-43d0-917f-2458e5e97109) |
| Create Post | ![Create Post With Images](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/5ed81a32-7d77-4b45-a247-16bf9897b6f7) |
| Messages | ![Message Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/e34ee458-575f-45bd-9f0f-cb141b53b63a) |

[View more screenshots](#all-screenshots)

</div>

## ⚙️ Prerequisites

Before installation, ensure you have the following installed:

- Node.js (v18.x or later)
- MongoDB (v6.0 or later)
- Git

## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/NgnPhamGiaHuy/Recial-Application.git
cd Recial-Application
```

### Configure Environment Variables

#### Client Configuration (.env in client/src/)

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

ACCESS_TOKEN_SECRET=your_access_token_secret

NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:8080

NEXT_PUBLIC_ENCRYPTION_KEY=your_encryption_key

NEXT_PUBLIC_GIPHY_API_KEY=your_giphy_api_key
NEXT_PUBLIC_OPEN_CAGE_API_KEY=your_cage_api_key

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

#### Server Configuration (.env in server/src/)

```env
DATABASE_CONNECT_LINK=your_database_connect_link

SMTP_EMAIL=your_smtp_email
SMTP_PASSWORD=your_smtp_password

ENCRYPTION_KEY=your_encryption_key
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

## 🏁 Running the Application

### Start the Frontend (Next.js)

```bash
cd client/src
npm install
npm run dev
```

The client application will be accessible at http://localhost:3000.

### Start the Backend (Node.js)

```bash
cd server/src
npm install
npm start
```

The server will be running at http://localhost:8080.

## 📊 Data Generation

For development and testing purposes, you can generate random data:

1. Locate the data generator function in the server code
2. Uncomment the function call to enable data generation:
   ```javascript
   // Uncomment to generate test data
   // dataGenerator();
   ```
3. Run the server and wait approximately 10 minutes for data generation
4. Re-comment the function to prevent accidental re-generation

## 🗂️ Project Structure

```
recial/
├── client/                 # Frontend application
│   └── src/
│       ├── app/           # Next.js app directory
│       ├── components/    # Reusable UI components
│       ├── constants/     # Constants and configurations
│       ├── hooks/         # Custom React hooks
│       ├── public/        # Static files
│       ├── scripts/       # Utility scripts
│       ├── store/         # Redux store configuration
│       └── utils/         # Utility functions
└── server/                # Backend application
    └── src/
        ├── app/          # Application routes and middleware
        ├── assets/       # Static assets
        ├── certificates/ # SSL certificates
        ├── config/       # Configuration files
        ├── public/       # Public static files
        └── utils/        # Utility functions
```

## 📚 API Documentation

### Public Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/*` | POST/GET | Authentication endpoints |
| `/api/public/page/*` | GET | Public page endpoints |
| `/api/public/media/*` | GET | Public media endpoints |
| `/api/public/group/*` | GET | Public group endpoints |
| `/api/public/post/*` | GET | Public post endpoints |
| `/api/public/user/*` | GET | Public user endpoints |

### Secure Routes (Requires Authentication)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/secure/video/*` | GET/POST | Video management |
| `/api/secure/role/*` | GET/PUT | Role management |
| `/api/secure/event/*` | GET/POST | Event management |
| `/api/secure/story/*` | GET/POST | Story management |
| `/api/secure/saved/*` | GET/POST | Saved content |
| `/api/secure/comment/*` | GET/POST | Comment management |
| `/api/secure/setting/*` | GET/PUT | User settings |
| `/api/secure/messages/*` | GET/POST | Messaging system |
| `/api/secure/post/*` | GET/POST | Post management |
| `/api/secure/user/*` | GET/PUT | User management |

## 🔧 Troubleshooting

### MongoDB Connection Issues

- Verify MongoDB is running locally
- Check connection string in server/.env
- Ensure network connectivity to database server

### Authentication Problems

- Verify Google OAuth credentials
- Ensure JWT tokens are properly configured
- Check environment variables for correct values

### Real-time Features Not Working

- Verify WebSocket connection
- Check Firebase configuration
- Ensure proper port forwarding if using a proxy

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

## 📄 License

This project is privately owned by NgnPhamGiaHuy and is intended for personal use only. Unauthorized copying or reproduction of this project, in whole or in part, is strictly prohibited.

For inquiries about using this project for purposes other than personal use, please contact the project owner at yuh.nguyenpham@gmail.com.

## 👤 Author

**NgnPhamGiaHuy**

[![GitHub](https://img.shields.io/badge/GitHub-NgnPhamGiaHuy-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/NgnPhamGiaHuy)
[![Email](https://img.shields.io/badge/Email-yuh.nguyenpham@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:yuh.nguyenpham@gmail.com)

---

<div align="center" id="all-screenshots">

## 📸 All Screenshots

| Interface | Preview |
|-----------|---------|
| Login | ![Login Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/a46f0f30-dc25-4399-aa17-9f37b1cfdc17) |
| Register | ![Register Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/43acd1d5-e478-416f-a1a4-9939babac001) |
| Landing | ![Landing Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/ee41d239-d876-4fff-a07a-4c7b07b16c6c) |
| User Landing | ![User Landing Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/5cfb103a-19f0-43d0-917f-2458e5e97109) |
| Profile Settings | ![Profile Setting Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/66431085-53e2-4e8c-bd19-a5ef6971c7c2) |
| Create Post | ![Create Post With Images](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/5ed81a32-7d77-4b45-a247-16bf9897b6f7) |
| Friends | ![Friend Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/dd7d0603-3cf4-43a2-a8d1-951d045692fa) |
| Friend Requests | ![Friend Request Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/94615be9-bcd1-414b-9d84-d5a20c943dc1) |
| Media | ![Media Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/4382b5ea-1ae4-4c81-9825-e50c2b67f259) |
| Group Feed | ![Group Feed Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/4fa33277-4202-46c8-a1fd-f7a8b181679e) |
| Group Join | ![Group Join Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/5137dc2e-d45e-40a7-87ec-658782bd3d5e) |
| Groups | ![Group Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/5da8a5d7-97bb-42ef-87f8-ea134540e2a4) |
| Pages | ![Page Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/c38c6cdd-644c-41d4-972d-be0f8a24ae6f) |
| Events | ![Event Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/904f4c4b-b4b3-42e3-9161-bee22ec6f73e) |
| Messages | ![Message Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/e34ee458-575f-45bd-9f0f-cb141b53b63a) |
| Settings | ![Setting Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/10fdfb6c-b432-4c23-be12-5639b2f8339b) |

</div>

<div align="center">
Made with ❤️ by NgnPhamGiaHuy
</div>
