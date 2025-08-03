const express = require('express');
const { body, param } = require('express-validator');
const passport = require('../config/passport');
const controladorEncuestaDemanda = require('../controllers/controladorEncuestaDemanda');
const router = express.Router();

/**
 * @swagger
 * tags:
 * name: Encuestas de Demanda
 * description: API para la gestión de encuestas de demanda
 */

/**
 * @swagger
 * /api/encuestas-demanda:
 * get:
 * summary: Obtener todas las encuestas de demanda
 * tags: [Encuestas de Demanda]
 * responses:
 * 200:
 * description: Lista de encuestas de demanda
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/EncuestaDemanda'
 * 500:
 * description: Error del servidor
 */
router.get('/', controladorEncuestaDemanda.getAllEncuestasDemanda);

/**
 * @swagger
 * /api/encuestas-demanda/{id}:
 * get:
 * summary: Obtener una encuesta de demanda por ID
 * tags: [Encuestas de Demanda]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID de la encuesta de demanda
 * responses:
 * 200:
 * description: Información de la encuesta de demanda
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/EncuestaDemanda'
 * 404:
 * description: Encuesta de demanda no encontrada
 * 500:
 * description: Error del servidor
 */
router.get('/:id', controladorEncuestaDemanda.getEncuestaDemandaById);

/**
 * @swagger
 * /api/encuestas-demanda:
 * post:
 * summary: Crear una nueva encuesta de demanda
 * tags: [Encuestas de Demanda]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/EncuestaDemandaInput'
 * responses:
 * 201:
 * description: Encuesta de demanda creada exitosamente
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/EncuestaDemanda'
 * 500:
 * description: Error del servidor
 */
router.post('/', controladorEncuestaDemanda.createEncuestaDemanda);

/**
 * @swagger
 * /api/encuestas-demanda/{id}:
 * put:
 * summary: Actualizar una encuesta de demanda existente
 * tags: [Encuestas de Demanda]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID de la encuesta de demanda
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/EncuestaDemandaInput'
 * responses:
 * 200:
 * description: Encuesta de demanda actualizada exitosamente
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/EncuestaDemanda'
 * 404:
 * description: Encuesta de demanda no encontrada
 * 500:
 * description: Error del servidor
 */
router.put('/:id', controladorEncuestaDemanda.updateEncuestaDemanda);

/**
 * @swagger
 * /api/encuestas-demanda/{id}:
 * delete:
 * summary: Eliminar una encuesta de demanda
 * tags: [Encuestas de Demanda]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID de la encuesta de demanda
 * responses:
 * 204:
 * description: Encuesta de demanda eliminada exitosamente (No Content)
 * 404:
 * description: Encuesta de demanda no encontrada
 * 500:
 * description: Error del servidor
 */
router.delete('/:id', controladorEncuestaDemanda.deleteEncuestaDemanda);


module.exports = router;
