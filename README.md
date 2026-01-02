# Live Polling System

A real-time polling application built with React, Node.js, Express, Socket.io, and MongoDB. Enables teachers to create polls, ask questions, and view live results while students answer and see real-time updates.

## Features

### Authentication & Authorization
- **Teacher & Student Roles**: distinct dashboards and capabilities.
- **Secure Login/Signup**: JWT-based authentication with HTTP-only cookies.
- **Protected Routes**: Middleware to ensure only authorized users access specific pages.

### Teacher
- Create polls with title and description (persisted in MongoDB).
- Ask questions one by one with customizable time limits.
- View live results as students answer.
- Cannot start a new question until previous one is completed.
- View past poll results.
- Chat with students.
- Remove students from active poll.

### Student
- Join polls using a poll ID.
- Real-time updates via Socket.io.
- Answer questions with countdown timer.
- View live results after answering.
- Chat with teacher and other students.

## Tech Stack

**Backend:**
- Node.js with Express
- MongoDB (Database) & Mongoose (ODM)
- Socket.io for real-time communication
- JWT & Cookies for Authentication

**Frontend:**
- React 18
- Vite
- React Router (with Protected Routes)
- Socket.io Client
- Axios (for API requests)
- Tailwind CSS

## Project Structure

```
Polling-system/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js             # Database connection
│   │   ├── controllers/
│   │   │   └── authController.js # Auth logic (register, login, etc)
│   │   ├── middleware/
│   │   │   └── authMiddleware.js # JWT protection middleware
│   │   ├── models/
│   │   │   ├── User.js           # User schema
│   │   │   └── Poll.js           # Poll schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js     # Auth API routes
│   │   │   └── pollRoutes.js     # Poll API routes
│   │   ├── socket/
│   │   │   └── pollSocket.js     # Socket.io event handlers
│   │   └── index.js              # Server entry point
│   ├── package.json
│   └── .env.example
│
└── polling-client-new/
    ├── src/
    │   ├── api/
    │   │   └── api.js            # Axios configuration
    │   ├── context/
    │   │   ├── AuthContext.jsx   # Authentication State
    │   │   └── SocketContext.jsx # WebSockets State
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── TeacherPage.jsx
    │   │   └── StudentPage.jsx
    │   ├── components/           # UI Components
    │   └── App.jsx               # Routing
    ├── package.json
    └── vite.config.js
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (running locally or via Atlas)
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=3000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/polling-system
JWT_SECRET=your_jwt_secret_key_here
```

4. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd polling-client-new
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env` (optional):
```
VITE_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:5173`

## Usage

### Authentication
1. Go to `/signup` to create an account.
2. Select **Teacher** or **Student** role.
3. You will be redirected to your respective dashboard.

### Teacher Flow
1. Login as a Teacher.
2. Create a new poll.
3. Share the **Poll ID** with students.
4. Broadcast questions and manage the live session.

### Student Flow
1. Login as a Student.
2. Enter the **Poll ID** to join the session.
3. Wait for questions and submit answers in real-time.

## API Endpoints

### Auth API
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user profile

### Poll API
- `POST /api/polls` - Create a new poll (Protected)
- `GET /api/polls/:pollId` - Get poll details
- `GET /api/polls/:pollId/results` - Get poll results

## License

MIT
