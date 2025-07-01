const express = require('express');
const pool = require('../db');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

// Get all blogs

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT b.*, u.name as creator_name 
            FROM blogs b 
            JOIN users u ON b.creator_user_id = u.user_id 
            ORDER BY b.date_created DESC
        `);
        
        const categories = ["Tech", "Lifestyle", "Education", "General"];
        const selectedCategory = req.query.category;
        
        let filteredPosts = result.rows;
        if (selectedCategory) {
            filteredPosts = result.rows.filter(post => post.category === selectedCategory);
        }
        
        res.render('home', { 
            posts: filteredPosts, 
            categories, 
            selectedCategory,
            user: req.session.user 
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).send('Error fetching blogs');
    }
});

// New blog form
router.get('/new', isAuthenticated, async (req, res) => {
    const categories = ["Tech", "Lifestyle", "Education", "General"];
    res.render('new', { categories, user: req.session.user });
});

// Create new blog
router.post('/new', isAuthenticated, async (req, res) => {
    const { title, content, category } = req.body;
    const user = req.session.user;
    
    try {
        await pool.query(
            'INSERT INTO blogs (creator_name, creator_user_id, title, body, category) VALUES ($1, $2, $3, $4, $5)',
            [user.name, user.user_id, title, content, category || 'General']
        );
        res.redirect('/');
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).send('Error creating blog');
    }
});

// Edit blog form
router.get('/edit/:id', isAuthenticated, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM blogs WHERE blog_id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.redirect('/');
        }
        
        const post = result.rows[0];
        
        // Check if user owns this post
        if (post.creator_user_id !== req.session.user.user_id) {
            return res.redirect('/');
        }
        
        const categories = ["Tech", "Lifestyle", "Education", "General"];
        res.render('edit', { post, categories, user: req.session.user });
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.redirect('/');
    }
});

// Update blog
router.post('/edit/:id', isAuthenticated, async (req, res) => {
    const { title, content, category } = req.body;
    const user = req.session.user;
    
    try {
        // Check if user owns this post
        const checkResult = await pool.query(
            'SELECT creator_user_id FROM blogs WHERE blog_id = $1', 
            [req.params.id]
        );
        
        if (checkResult.rows.length === 0 || checkResult.rows[0].creator_user_id !== user.user_id) {
            return res.redirect('/');
        }
        
        await pool.query(
            'UPDATE blogs SET title = $1, body = $2, category = $3 WHERE blog_id = $4',
            [title, content, category || 'General', req.params.id]
        );
        
        res.redirect('/');
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).send('Error updating blog');
    }
});

// Delete blog
router.post('/delete/:id', isAuthenticated, async (req, res) => {
    const user = req.session.user;
    
    try {
        // Check if user owns this post
        const checkResult = await pool.query(
            'SELECT creator_user_id FROM blogs WHERE blog_id = $1', 
            [req.params.id]
        );
        
        if (checkResult.rows.length === 0 || checkResult.rows[0].creator_user_id !== user.user_id) {
            return res.redirect('/');
        }
        
        await pool.query('DELETE FROM blogs WHERE blog_id = $1', [req.params.id]);
        res.redirect('/');
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).send('Error deleting blog');
    }
});

module.exports = router; 