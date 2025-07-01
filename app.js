// CS-312 MiniProject-3 - Blog Web Application with PostgreSQL and Authentication
// Developed by: Avnish Sinha

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

// Import routes
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');

// Initialize express app
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
// Set the views directory path
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data (body-parser)
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files like CSS from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Make user available to all views
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// Routes
app.use('/', authRoutes);
app.use('/blogs', blogRoutes);

// Redirect root to blogs
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
