const express = require('express');
const { body, param } = require('express-validator');
const passport = require('../config/passport');
const controladorEventoSector = require('../controllers/controladorEventoSector');

const router = express.Router();

module.exports = router;