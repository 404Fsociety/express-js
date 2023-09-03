const express = require('express');
const app = express();
const port = 3000;

// Custom middleware to check if it's a working day and time
const isWorkingHours = (req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hour = now.getHours();

    if (dayOfWeek >= 0 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
        // It's a working day and time, continue with the request
        next();
    } else {
        // It's outside working hours, send a message
        res.send('Sorry, the web application is only available during working hours (Mon-Fri, 9 AM - 5 PM).');
    }
};

// Serve static files from the public directory
app.use(express.static('public'));

// Define routes
app.get('/', isWorkingHours, (req, res) => {
    res.render('home.ejs');
});

app.get('/services', isWorkingHours, (req, res) => {
    res.render('services.ejs');
});

app.get('/contact', isWorkingHours, (req, res) => {
    res.render('contact.ejs');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
