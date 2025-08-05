const express = require('express');
const controladorEncuestaDemanda = require('../controllers/controladorEncuestaDemanda');
const { body, param, query } = require('express-validator');
const { validationResult } = require('express-validator');
const EncuestaDemanda = require('../models/encuestaDemanda');
const { Op } = require('sequelize');
const router = express.Router();

// Middleware para manejar resultados de validación
const manejarResultadosValidacion = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

/**
 * @swagger
 * tags:
 *   - name: EncuestaDemanda
 *     description: Endpoints para gestionar encuestas de demanda
 */

/**
 * @swagger
 * /api/encuesta-demanda:
 *   get:
 *     summary: Listar todas las encuestas de demanda
 *     tags: [EncuestaDemanda]
 *     responses:
 *       200:
 *         description: Lista de encuestas de demanda
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EncuestaDemanda'
 */
router.get('/', controladorEncuestaDemanda.listar);

/**
 * @swagger
 * /api/encuesta-demanda/{id}:
 *   get:
 *     summary: Obtener encuesta de demanda por ID
 *     tags: [EncuestaDemanda]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Encuesta de demanda encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EncuestaDemanda'
 *       404:
 *         description: Encuesta de demanda no encontrada
 */
router.get('/:id',
    param('id')
        .isInt().withMessage('El ID debe ser un número entero')
        .toInt()
        .custom(async (value) => {
            const encuesta = await EncuestaDemanda.findByPk(value);
            if (!encuesta) {
                throw new Error('Encuesta de demanda no encontrada');
            }
            return true;
        }),
    manejarResultadosValidacion,
    controladorEncuestaDemanda.obtenerPorId
);

/**
 * @swagger
 * /api/encuesta-demanda/buscar/producto:
 *   get:
 *     summary: Buscar encuestas de demanda por producto
 *     tags: [EncuestaDemanda]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *         description: ID o texto de búsqueda para producto
 *     responses:
 *       200:
 *         description: Lista de encuestas encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EncuestaDemanda'
 *       404:
 *         description: No se encontraron encuestas para ese producto
 */
router.get('/buscar/producto',
  query('q')
    .isLength({ min: 1 }).withMessage('Debe proporcionar al menos 1 caracter para la búsqueda')
    .trim()
    .escape(),
  manejarResultadosValidacion,
  controladorEncuestaDemanda.buscarPorProducto
);

/**
 * @swagger
 * /api/encuesta-demanda:
 *   post:
 *     summary: Guardar una nueva encuesta de demanda
 *     tags: [EncuestaDemanda]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EncuestaDemandaInput'
 *     responses:
 *       201:
 *         description: Encuesta de demanda guardada correctamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post('/',
    body('id_producto')
        .isInt().withMessage('El id_producto debe ser un número entero'),
    body('porcentaje_demanda')
        .isFloat({ min: 0, max: 100 }).withMessage('El porcentaje debe estar entre 0 y 100'),
    body('anio')
        .isInt({ min: 1900, max: 2100 }).withMessage('El año debe ser válido'),
    manejarResultadosValidacion,
    controladorEncuestaDemanda.guardar
);

/**
 * @swagger
 * /api/encuesta-demanda/{id}:
 *   put:
 *     summary: Editar una encuesta de demanda existente
 *     tags: [EncuestaDemanda]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EncuestaDemandaInput'
 *     responses:
 *       200:
 *         description: Encuesta de demanda actualizada correctamente
 *       404:
 *         description: Encuesta de demanda no encontrada
 */
router.put('/:id',
    param('id')
        .isInt().withMessage('El ID debe ser un número entero')
        .toInt()
        .custom(async (value) => {
            const encuesta = await EncuestaDemanda.findByPk(value);
            if (!encuesta) {
                throw new Error('Encuesta de demanda no encontrada');
            }
            return true;
        }),
    body('id_producto')
        .optional()
        .isInt().withMessage('El id_producto debe ser un número entero'),
    body('porcentaje_demanda')
        .optional()
        .isFloat({ min: 0, max: 100 }).withMessage('El porcentaje debe estar entre 0 y 100'),
    body('anio')
        .optional()
        .isInt({ min: 1900, max: 2100 }).withMessage('El año debe ser válido'),
    manejarResultadosValidacion,
    controladorEncuestaDemanda.editar
);

/**
 * @swagger
 * /api/encuesta-demanda/{id}:
 *   delete:
 *     summary: Eliminar encuesta de demanda por ID
 *     tags: [EncuestaDemanda]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Encuesta de demanda eliminada correctamente
 *       404:
 *         description: Encuesta de demanda no encontrada
 */
router.delete('/:id',
    param('id')
        .isInt().withMessage('El ID debe ser un número entero')
        .toInt()
        .custom(async (value) => {
            const encuesta = await EncuestaDemanda.findByPk(value);
            if (!encuesta) {
                throw new Error('Encuesta de demanda no encontrada');
            }
            return true;
        }),
    manejarResultadosValidacion,
    controladorEncuestaDemanda.eliminar
);

/**
 * @swagger
 * components:
 *   schemas:
 *     EncuestaDemanda:
 *       type: object
 *       properties:
 *         id_encuesta:
 *           type: integer
 *         id_producto:
 *           type: integer
 *         porcentaje_demanda:
 *           type: number
 *           format: float
 *         anio:
 *           type: integer
 *     EncuestaDemandaInput:
 *       type: object
 *       required:
 *         - id_producto
 *         - porcentaje_demanda
 *         - anio
 *       properties:
 *         id_producto:
 *           type: integer
 *         porcentaje_demanda:
 *           type: number
 *           format: float
 *         anio:
 *           type: integer
 */

module.exports = router;
