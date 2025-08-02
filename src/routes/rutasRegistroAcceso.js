const express = require('express');
const { body, param } = require('express-validator');
const passport = require('../config/passport');
const controladorRegistroAcceso = require('../controllers/controladorRegistrosAcceso');
const router = express.Router();



module.exports = router;