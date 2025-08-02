const express = require('express');
const { body, param } = require('express-validator');
const passport = require('../config/passport');
const controladorTendenciaTecnologica = require('../controllers/controladorTendenciaTecnologica');
const router = express.Router();


module.exports = router;