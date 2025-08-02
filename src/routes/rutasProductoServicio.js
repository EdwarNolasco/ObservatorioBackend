const express = require('express');
const { body, param } = require('express-validator');
const passport = require('../config/passport');
const controladorProductoServicio = require('../controllers/controladorProductoServicio');
const router = express.Router();



module.exports = router;