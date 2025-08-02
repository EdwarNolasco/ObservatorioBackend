const express = require('express');
const { body, param } = require('express-validator');
const passport = require('../config/passport');
const controladorAuth = require('../controllers/controladorAuth');

const router = express.Router();

module.exports = router;