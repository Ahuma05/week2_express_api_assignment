const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// JSON Parsing Middleware
app.use(express.json());

// My Custom Request Logging Middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} request made to: ${req.url}`);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

//  POST /user -> Accepts { name, email }, validates data, and responds
app.post('/user', (req, res) => {
    const { name, email } = req.body;

    // Error handling 
    if (!name || !email) {
        return res.status(400).json({ 
            error: 'Bad Request', 
            message: 'Missing required fields: "name" and "email" are required.' 
        });
    }

    res.status(200).send(`Hello, ${name}!`);
});

//  GET /user/:id -> Responds with user profile message
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ${userId} profile`);
});

//  Global Error Handling Middleware (fallback)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});