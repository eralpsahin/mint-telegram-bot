/* Index Route */
const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => res.json({ data: 'placeholder' }));

module.exports = router;
