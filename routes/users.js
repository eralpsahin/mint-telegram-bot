/* Sample Route */
const express = require('express');

const router = express.Router();

const users = ['Eralp', 'Sahin'];

/* GET users listing. */
router.get('/', (req, res) => res.json(users));

module.exports = router;
