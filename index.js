const express = require('express');
const { sendEmail } = require('./controller/mailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// ✅ Default route to display a welcome message
app.get('/', (req, res) => {
    res.send('Welcome to the Email Service API! Use POST /send-email to send emails.');
});

// Route to send an email
app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ message: 'Missing required fields: to, subject, text' });
    }

    try {
        await sendEmail(to, subject, text);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
