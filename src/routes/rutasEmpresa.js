const express = require('express');
const { body, param } = require('express-validator');
const passport = require('../config/passport');
const controladorEmpresa = require('../controllers/controladorEmpresa');
const router = express.Router();

module.exports = router;