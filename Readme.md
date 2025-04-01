# Recial Application

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb)
![License](https://img.shields.io/badge/License-Private-red)

</div>

Welcome to Recial Application! This is a full-stack social media platform built with modern web technologies. The application provides a rich set of features for social networking, content sharing, and real-time communication.

## ✨ Features

<div align="center">

| Category              | Features                                                                                           |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| 🔐 **Authentication** | • Google OAuth integration<br>• JWT-based authentication<br>• Secure password handling             |
| 👥 **Social**         | • Friend system with requests<br>• User profiles and settings<br>• Real-time messaging             |
| 📱 **Content**        | • Post creation with media support<br>• Image and video uploads<br>• Group creation and management |
| 🎯 **Events & Pages** | • Event creation and management<br>• Page creation and following<br>• Group feed and interactions  |
| 🔔 **Real-time**      | • WebSocket integration<br>• Real-time notifications<br>• Live chat functionality                  |

</div>

## 🛠️ Tech Stack

<div align="center">

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Redux](https://img.shields.io/badge/Redux-5.0.0-purple?logo=redux)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0.0-38B2AC?logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-10.0.0-FFCA28?logo=firebase)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.18.2-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb)
![WebSocket](https://img.shields.io/badge/WebSocket-8.15.1-blue?logo=websocket)
![JWT](https://img.shields.io/badge/JWT-9.0.2-black?logo=jsonwebtoken)

</div>

## 📁 Project Structure

```
recial-application/
├── client/                 # Frontend application
│   └── src/
│       ├── app/           # Next.js app directory
│       ├── components/    # Reusable UI components
│       ├── constants/     # Constants and configurations
│       ├── hooks/         # Custom React hooks
│       ├── public/        # Static files
│       ├── scripts/       # Utility scripts
│       ├── store/         # Redux store configuration
│       ├── utils/         # Utility functions
│       ├── .env          # Environment variables
│       ├── .env.production # Production environment variables
│       ├── next.config.js # Next.js configuration
│       ├── tailwind.config.js # Tailwind CSS configuration
│       └── package.json   # Frontend dependencies
└── server/                # Backend application
    └── src/
        ├── app/          # Application routes and middleware
        ├── assets/       # Static assets
        ├── certificates/ # SSL certificates
        ├── config/       # Configuration files
        ├── public/       # Public static files
        ├── utils/        # Utility functions
        ├── .env         # Environment variables
        ├── .env.production # Production environment variables
        ├── index.js     # Main application entry
        ├── index_production.js # Production entry point
        └── package.json  # Backend dependencies
```

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Set Up Environment Variables](#set-up-environment-variables)
  - [Run the Application](#run-the-application)
  - [Generate Random Data](#generate-random-data)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [Images](#images)
- [License](#license)

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js and npm - [Install Node.js](https://nodejs.org/)
- MongoDB - [Install MongoDB](https://www.mongodb.com/try/download/community)

## 🚀 Getting Started

Follow these steps to set up and run the application on your local machine.

### Clone the Repository

```bash
git clone https://github.com/NgnPhamGiaHuy/Recial-Application.git
cd Recial-Application
```

### Set Up Environment Variables

Create a new file named `.env` in the client directory:

```bash
# client/src/.env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
ACCESS_TOKEN_SECRET=your_access_token_secret
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:8080
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

Create a new file named `.env` in the server directory:

```bash
# server/src/.env
DATABASE_CONNECT_LINK=your_database_connect_link
DATABASE_LOCAL_CONNECT_LINK=your_local_database_connect_link
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

### Run the Application

#### Run Next.js Server (Client)

```bash
cd client/src
npm install
npm run dev
```

The client application will be accessible at http://localhost:3000.

#### Run Node.js Server (Server)

```bash
cd server/src
npm install
npm start
```

The server will be running at http://localhost:8080.

### Generate Random Data

1. **Uncomment the `dataGenerator` Function:**

   ```javascript
   // Uncomment the following line to enable the data generator
   // dataGenerator();
   ```

   This script will generate random data and populate your database (takes ~10 minutes).

2. **Comment the dataGenerator Function Again:**
   After data generation, comment the function to prevent accidental re-generation.

## 📚 API Documentation

<div align="center">

### Public Routes

| Endpoint              | Method   | Description              |
| --------------------- | -------- | ------------------------ |
| `/api/auth/*`         | POST/GET | Authentication endpoints |
| `/api/public/page/*`  | GET      | Public page endpoints    |
| `/api/public/media/*` | GET      | Public media endpoints   |
| `/api/public/group/*` | GET      | Public group endpoints   |
| `/api/public/post/*`  | GET      | Public post endpoints    |
| `/api/public/user/*`  | GET      | Public user endpoints    |

### Secure Routes (Requires Authentication)

| Endpoint                       | Method   | Description         |
| ------------------------------ | -------- | ------------------- |
| `/api/secure/video/*`          | GET/POST | Video management    |
| `/api/secure/role/*`           | GET/PUT  | Role management     |
| `/api/secure/watch/*`          | GET      | Video watching      |
| `/api/secure/event/*`          | GET/POST | Event management    |
| `/api/secure/story/*`          | GET/POST | Story management    |
| `/api/secure/saved/*`          | GET/POST | Saved content       |
| `/api/secure/comment/*`        | GET/POST | Comment management  |
| `/api/secure/setting/*`        | GET/PUT  | User settings       |
| `/api/secure/suggest/*`        | GET      | Content suggestions |
| `/api/secure/messages/*`       | GET/POST | Messaging system    |
| `/api/secure/reaction/*`       | POST     | Post reactions      |
| `/api/secure/friend-request/*` | GET/POST | Friend requests     |
| `/api/secure/post/*`           | GET/POST | Post management     |
| `/api/secure/user/*`           | GET/PUT  | User management     |

</div>

For detailed API documentation, please refer to the API documentation in the server directory.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔧 Troubleshooting

### Common Issues

<details>
<summary>MongoDB Connection Issues</summary>

- Ensure MongoDB is running locally
- Check your connection string in the server's .env file
- Verify network connectivity

</details>

<details>
<summary>Authentication Problems</summary>

- Verify your Google OAuth credentials
- Check if your JWT tokens are properly configured
- Ensure all environment variables are set correctly

</details>

<details>
<summary>Real-time Features Not Working</summary>

- Check WebSocket connection
- Verify Firebase configuration
- Ensure proper port forwarding if using a reverse proxy

</details>

## 📸 Images

<div align="center">

| Interface        | Preview                                                                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Login            | ![Login_Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/a46f0f30-dc25-4399-aa17-9f37b1cfdc17)           |
| Register         | ![Register_Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/43acd1d5-e478-416f-a1a4-9939babac001)        |
| Landing          | ![Landing_Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/ee41d239-d876-4fff-a07a-4c7b07b16c6c)         |
| User Landing     | ![User_Landing_Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/5cfb103a-19f0-43d0-917f-2458e5e97109)    |
| Profile Settings | ![Profile_Setting_Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/66431085-53e2-4e8c-bd19-a5ef6971c7c2) |
| Create Post      | ![Create_Post_With_Images](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/5ed81a32-7d77-4b45-a247-16bf9897b6f7)   |
| Friends          | ![Friend_Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/dd7d0603-3cf4-43a2-a8d1-951d045692fa)          |
| Friend Requests  | ![Friend_Request_Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/94615be9-bcd1-414b-9d84-d5a20c943dc1)  |
| Media            | ![Media_Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/4382b5ea-1ae4-4c81-9825-e50c2b67f259)           |
| Group Feed       | ![Group_Feed_Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/4fa33277-4202-46c8-a1fd-f7a8b181679e)      |
| Group Join       | ![Group_Join_Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/5137dc2e-d45e-40a7-87ec-658782bd3d5e)      |
| Groups           | ![Group_Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/5da8a5d7-97bb-42ef-87f8-ea134540e2a4)           |
| Pages            | ![Page_Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/c38c6cdd-644c-41d4-972d-be0f8a24ae6f)            |
| Events           | ![Event_Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/904f4c4b-b4b3-42e3-9161-bee22ec6f73e)           |
| Messages         | ![Message_Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/e34ee458-575f-45bd-9f0f-cb141b53b63a)         |
| Settings         | ![Setting_Interface](https://github.com/NgnPhamGiaHuy/Recial-Application/assets/84061230/10fdfb6c-b432-4c23-be12-5639b2f8339b)         |

</div>

## 📄 License

This project is privately owned by `NgnPhmGiaHuy` and is intended for personal use only. Unauthorized copying or reproduction of this project, in whole or in part, is strictly prohibited.

If you have any inquiries or would like to discuss the use of this project for purposes other than personal use, please contact the project owner at [`yuh.nguyenpham@gmail.com`].

---

<div align="center">
Made with ❤️ by NgnPhmGiaHuy
</div>
