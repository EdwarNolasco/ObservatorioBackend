require('dotenv').config();
const Usuario = require('../models/usuario');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const clave = process.env.CLAVE;


exports.getToken = (data) => {
  return jwt.sign({ ...data }, clave, { expiresIn: '30m' });
};


//acepta token desde cookies y desde headers
const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(), 
    (req) => req.cookies?.token || null  
  ]),
  secretOrKey: clave,
};

/*
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: clave,
};


// Leer el token de la cookie
const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      return req.cookies.token;
    }
  ]),
  secretOrKey: process.env.CLAVE,
};
*/
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log('JWT Payload:', jwt_payload);
    try {
      const user = await Usuario.findByPk(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport; // Exportar el objeto passport para usarlo en app.js