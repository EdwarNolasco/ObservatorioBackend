const express = require('express');
const { body, param } = require('express-validator');
const passport = require('../config/passport');
const controladorPais = require('../controllers/controladorPais');

const router = express.Router();

module.exports = router;