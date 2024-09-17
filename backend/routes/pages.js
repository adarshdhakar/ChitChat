const express = require('express');
const router = express.Router();

// Route to redirect to About page
router.get('/about', (req, res) => {
    res.redirect('http://localhost:3000/about'); // Redirect to Next.js About page
});

// Route to redirect to Contact page
router.get('/contact', (req, res) => {
    res.redirect('http://localhost:3000/contact'); // Redirect to Next.js Contact page
});

module.exports = router;
