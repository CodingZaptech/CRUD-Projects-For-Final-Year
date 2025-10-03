const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Application Schema
const applicationSchema = new mongoose.Schema({
    candidateName: { type: String, required: true },
    email: { type: String, required: true },
    position: { type: String, required: true },
    status: { type: String, default: 'Applied' },
    appliedDate: { type: Date, default: Date.now }
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

// CREATE new application
router.post('/', async (req, res) => {
    try {
        const application = new Application(req.body);
        const savedApp = await application.save();
        res.status(201).json(savedApp);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// READ all applications
router.get('/', async (req, res) => {
    try {
        const applications = await Application.find();
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ application by ID
router.get('/:id', async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.json(application);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE application by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedApp = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedApp) return res.status(404).json({ message: 'Application not found' });
        res.json(updatedApp);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE application by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedApp = await Application.findByIdAndDelete(req.params.id);
        if (!deletedApp) return res.status(404).json({ message: 'Application not found' });
        res.json({ message: 'Application deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
