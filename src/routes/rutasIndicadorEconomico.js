const express = require('express');
const { body, param } = require('express-validator');
const passport = require('../config/passport');
const controladorIndicadorEconomico = require('../controllers/controladorIndicadorEconomico');

const router = express.Router();

module.exports = router;