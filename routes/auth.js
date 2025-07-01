const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');
const { isNotAuthenticated } = require('../middleware/auth');
const router = express.Router();

// Signup page
router.get('/signup', isNotAuthenticated, (req, res) => {
    res.render('signup', { error: null });
});

// Handle signup
router.post('/signup', isNotAuthenticated, async (req, res) => {
    const { user_id, password, name } = req.body;
    
    try {
        // Check if user_id already exists
        const userCheck = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        
        if (userCheck.rows.length > 0) {
            return res.render('signup', { error: 'User ID already exists. Please choose a different one.' });
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert new user
        await pool.query('INSERT INTO users (user_id, password, name) VALUES ($1, $2, $3)', 
            [user_id, hashedPassword, name]);
        
        res.redirect('/signin');
    } catch (error) {
        console.error('Signup error:', error);
        res.render('signup', { error: 'An error occurred during signup.' });
    }
});

// Signin page
router.get('/signin', isNotAuthenticated, (req, res) => {
    res.render('signin', { error: null });
});

// Handle signin
router.post('/signin', isNotAuthenticated, async (req, res) => {
    const { user_id, password } = req.body;
    
    try {
        // Check if user exists
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        
        if (result.rows.length === 0) {
            return res.render('signin', { error: 'Invalid user ID or password.' });
        }
        
        const user = result.rows[0];
        
        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.render('signin', { error: 'Invalid user ID or password.' });
        }
        
        // Set session
        req.session.user = {
            user_id: user.user_id,
            name: user.name
        };
        
        res.redirect('/');
    } catch (error) {
        console.error('Signin error:', error);
        res.render('signin', { error: 'An error occurred during signin.' });
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/signin');
});

module.exports = router; 