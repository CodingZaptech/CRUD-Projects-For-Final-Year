const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define chat message schema
const chatSchema = new mongoose.Schema({
    username: { type: String, required: true },
    message: { type: String, required: true }
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

// POST a new chat message
router.post('/', async (req, res) => {
    try {
        const chat = new Chat(req.body);
        const savedChat = await chat.save();
        res.status(201).json(savedChat);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET all chat messages
router.get('/', async (req, res) => {
    try {
        const chats = await Chat.find();
        res.json(chats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
