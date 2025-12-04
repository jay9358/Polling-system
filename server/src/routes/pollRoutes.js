import express from 'express';
import pollStore from '../store/pollStore.js';

const router = express.Router();

// Create a new poll
router.post('/polls', (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const poll = pollStore.createPoll(title, description);
    res.json({ success: true, poll });
});

// Get poll details
router.get('/polls/:pollId', (req, res) => {
    const { pollId } = req.params;
    const poll = pollStore.getPoll(pollId);

    if (!poll) {
        return res.status(404).json({ error: 'Poll not found' });
    }

    res.json({ success: true, poll });
});

// Get poll results
router.get('/polls/:pollId/results', (req, res) => {
    const { pollId } = req.params;
    const results = pollStore.getResults(pollId);

    if (!results) {
        return res.status(404).json({ error: 'Poll not found' });
    }

    res.json({ success: true, results });
});

// Health check
router.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
