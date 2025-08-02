const express = require('express');
const { body, param } = require('express-validator');
const passport = require('../config/passport');
const controladorEncuestaDemanda = require('../controllers/controladorEncuestaDemanda');
const router = express.Router();



module.exports = router;