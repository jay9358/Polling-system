# Live Polling System

A real-time polling application built with React, Node.js, Express, and Socket.io. Enables teachers to create polls, ask questions, and view live results while students answer and see real-time updates.

## Features

### Teacher
- Create polls with title and description
- Ask questions one by one with customizable time limits
- View live results as students answer
- Cannot start a new question until previous one is completed (all students answered or timer expired)
- View past poll results
- Chat with students
- Remove students from active poll

### Student
- Join polls using a poll ID
- Session-based identity (name stored in sessionStorage)
- Answer questions with countdown timer
- View live results after answering
- Automatic question close when timer expires
- Chat with teacher and other students

## Tech Stack

**Backend:**
- Node.js with Express
- Socket.io for real-time communication
- In-memory data store (easily swappable to database)

**Frontend:**
- React 18
- Vite
- React Router
- Socket.io Client
- CSS Modules with dark theme

## Project Structure

```
Polling-system/
├── server/
│   ├── src/
│   │   ├── index.js              # Server entry point
│   │   ├── store/
│   │   │   └── pollStore.js      # In-memory data store
│   │   ├── socket/
│   │   │   └── pollSocket.js     # Socket.io event handlers
│   │   └── routes/
│   │       └── pollRoutes.js     # REST API routes
│   ├── package.json
│   └── .env.example
│
└── client/
    ├── src/
    │   ├── main.jsx              # React entry point
    │   ├── App.jsx               # Root component with routing
    │   ├── pages/
    │   │   ├── TeacherPage.jsx   # Teacher interface
    │   │   ├── TeacherPage.css
    │   │   ├── StudentPage.jsx   # Student interface
    │   │   └── StudentPage.css
    │   ├── components/
    │   │   ├── poll/
    │   │   │   ├── QuestionCard.jsx
    │   │   │   ├── QuestionCard.css
    │   │   │   ├── ResultsChart.jsx
    │   │   │   └── ResultsChart.css
    │   │   └── chat/
    │   │       ├── ChatPopup.jsx
    │   │       └── ChatPopup.css
    │   ├── hooks/
    │   │   └── usePollSocket.js  # Socket.io connection hook
    │   └── styles/
    │       └── global.css        # Global styles and design tokens
    ├── package.json
    ├── vite.config.js
    └── .env.example
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
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

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```
PORT=3000
CLIENT_URL=http://localhost:5173
```

5. Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```
VITE_SOCKET_URL=http://localhost:3000
```

5. Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:5173`

## Usage

### Teacher Flow

1. Open browser and navigate to `http://localhost:5173/teacher`
2. Create a new poll with a title and optional description
3. Copy the generated Poll ID to share with students
4. Create a question with:
   - Question text
   - 2-5 answer options
   - Time limit (default 60 seconds)
5. Click "Start Question" to broadcast to students
6. View live results as students answer
7. Wait for all students to answer or timer to expire before asking next question
8. Switch to "View Results" tab to see past questions and statistics

### Student Flow

1. Open browser and navigate to `http://localhost:5173/student`
2. Enter your name (stored in session)
3. Enter the Poll ID provided by teacher
4. Click "Join Poll"
5. When a question appears:
   - Select your answer
   - Watch the countdown timer
   - Submit before time runs out
6. View live results after submitting or when timer expires
7. Wait for next question

### Chat Feature

- Click the chat button (💬) in the bottom-right corner
- Send messages to communicate with teacher/students
- Messages are tagged with sender name and role

## Deployment

### Backend Deployment (e.g., Render, Railway, Heroku)

1. Push code to Git repository
2. Create new web service on hosting platform
3. Set environment variables:
   - `PORT` (usually auto-set by platform)
   - `CLIENT_URL` (your deployed frontend URL)
4. Deploy from repository
5. Note the deployed backend URL

### Frontend Deployment (e.g., Netlify, Vercel)

1. Push code to Git repository
2. Create new site on hosting platform
3. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Set environment variable:
   - `VITE_SOCKET_URL` (your deployed backend URL)
5. Deploy from repository

## API Endpoints

### REST API

- `POST /api/polls` - Create a new poll
- `GET /api/polls/:pollId` - Get poll details
- `GET /api/polls/:pollId/results` - Get poll results
- `GET /api/health` - Health check

### Socket.io Events

**Teacher Events:**
- `teacher:create_poll` - Create new poll
- `teacher:start_question` - Start a question
- `teacher:close_question` - Manually close question
- `teacher:remove_student` - Remove student from poll

**Student Events:**
- `student:join_poll` - Join a poll
- `student:submit_answer` - Submit answer to question

**Broadcast Events:**
- `question:started` - New question broadcast to all
- `question:closed` - Question closed notification
- `results:update` - Live results update
- `student:joined` - Student joined notification
- `student:left` - Student left notification
- `student:removed` - Student removed notification

**Chat Events:**
- `chat:send_message` - Send chat message
- `chat:new_message` - Receive chat message

## Development Notes

- Data is stored in-memory and will be lost on server restart
- The in-memory store structure is designed to be easily replaced with a database (MongoDB, PostgreSQL, etc.)
- Student identity is session-based (each browser tab = unique student)
- Question timing is server-authoritative to prevent client-side manipulation
- All real-time updates use Socket.io rooms for efficient broadcasting

## Future Enhancements

- Persistent database storage (MongoDB/PostgreSQL)
- User authentication for teachers
- Poll analytics and export
- Multiple choice and text-based questions
- Student leaderboard
- Poll templates
- Mobile app

## License

MIT
