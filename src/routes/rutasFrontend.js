const express = require('express');
const { body, param } = require('express-validator');
const passport = require('../config/passport');
const controladorFrontend = require('../controllers/controladorFrontend');

const router = express.Router();

module.exports = router;