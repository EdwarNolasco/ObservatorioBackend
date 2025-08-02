const express = require('express');
const { body, param } = require('express-validator');
const passport = require('../config/passport');
const controladorUsuario = require('../controllers/controladorUsuario');

const router = express.Router();

module.exports = router;