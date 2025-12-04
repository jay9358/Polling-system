import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import pollRoutes from './routes/pollRoutes.js';
import { setupPollSocket } from './socket/pollSocket.js';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST'],
        credentials: false
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', pollRoutes);

// Setup Socket.io
setupPollSocket(io);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Socket.io ready for connections`);
});
