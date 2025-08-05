const express = require('express');
const controladorProductoServicio = require('../controllers/controladorProductoServicio');
const { body, param, query } = require('express-validator');
const { validationResult } = require('express-validator');
const ProductoServicio = require('../models/productoservicio');
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
 *   - name: ProductoServicio
 *     description: Endpoints para gestionar productos y servicios
 */

/**
 * @swagger
 * /api/productos-servicios:
 *   get:
 *     summary: Listar todos los productos y servicios
 *     tags: [ProductoServicio]
 *     responses:
 *       200:
 *         description: Lista de productos y servicios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductoServicio'
 */
router.get('/', controladorProductoServicio.listar);

/**
 * @swagger
 * /api/productos-servicios/{id}:
 *   get:
 *     summary: Obtener producto o servicio por ID
 *     tags: [ProductoServicio]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto o servicio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductoServicio'
 *       404:
 *         description: Producto o servicio no encontrado
 */
router.get('/:id',
    param('id')
        .isInt().withMessage('El ID debe ser un número entero')
        .toInt()
        .custom(async (value) => {
            const producto = await ProductoServicio.findByPk(value);
            if (!producto) {
                throw new Error('Producto o servicio no encontrado');
            }
            return true;
        }),
    manejarResultadosValidacion,
    controladorProductoServicio.obtenerPorId
);

/**
 * @swagger
 * /api/productos-servicios/buscar/nombre:
 *   get:
 *     summary: Buscar productos o servicios por nombre
 *     tags: [ProductoServicio]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 3
 *         description: Texto de búsqueda (mínimo 3 caracteres)
 *     responses:
 *       200:
 *         description: Lista de productos o servicios encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductoServicio'
 *       404:
 *         description: No se encontraron productos con ese nombre
 */
router.get('/buscar/nombre',
  query('q')
    .isLength({ min: 3 }).withMessage('Debe proporcionar al menos 3 caracteres para la búsqueda')
    .trim()
    .escape(),
  manejarResultadosValidacion,
  controladorProductoServicio.buscarPorNombre
);

/**
 * @swagger
 * /api/productos-servicios:
 *   post:
 *     summary: Guardar un nuevo producto o servicio
 *     tags: [ProductoServicio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoServicioInput'
 *     responses:
 *       201:
 *         description: Producto o servicio guardado correctamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post('/',
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 255 }).withMessage('El nombre debe tener entre 2 y 255 caracteres'),
    body('tipo')
        .trim()
        .notEmpty().withMessage('El tipo es obligatorio')
        .isLength({ min: 2, max: 100 }).withMessage('El tipo debe tener entre 2 y 100 caracteres'),
    body('id_empresa')
        .isInt().withMessage('El id_empresa debe ser un número entero'),
    body('descripcion')
        .optional()
        .trim(),
    body('fecha_lanzamiento')
        .optional()
        .isISO8601().withMessage('La fecha debe tener formato válido'),
    body('imagen_producto')
        .optional()
        .trim(),
    manejarResultadosValidacion,
    controladorProductoServicio.guardar
);

/**
 * @swagger
 * /api/productos-servicios/{id}:
 *   put:
 *     summary: Editar un producto o servicio existente
 *     tags: [ProductoServicio]
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
 *             $ref: '#/components/schemas/ProductoServicioInput'
 *     responses:
 *       200:
 *         description: Producto o servicio actualizado correctamente
 *       404:
 *         description: Producto o servicio no encontrado
 */
router.put('/:id',
    param('id')
        .isInt().withMessage('El ID debe ser un número entero')
        .toInt()
        .custom(async (value) => {
            const producto = await ProductoServicio.findByPk(value);
            if (!producto) {
                throw new Error('Producto o servicio no encontrado');
            }
            return true;
        }),
    body('nombre')
        .optional()
        .trim()
        .isLength({ min: 2, max: 255 }).withMessage('El nombre debe tener entre 2 y 255 caracteres'),
    body('tipo')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('El tipo debe tener entre 2 y 100 caracteres'),
    body('descripcion')
        .optional()
        .trim(),
    body('fecha_lanzamiento')
        .optional()
        .isISO8601().withMessage('La fecha debe tener formato válido'),
    body('imagen_producto')
        .optional()
        .trim(),
    manejarResultadosValidacion,
    controladorProductoServicio.editar
);

/**
 * @swagger
 * /api/productos-servicios/{id}:
 *   delete:
 *     summary: Eliminar producto o servicio por ID
 *     tags: [ProductoServicio]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto o servicio eliminado correctamente
 *       404:
 *         description: Producto o servicio no encontrado
 */
router.delete('/:id',
    param('id')
        .isInt().withMessage('El ID debe ser un número entero')
        .toInt()
        .custom(async (value) => {
            const producto = await ProductoServicio.findByPk(value);
            if (!producto) {
                throw new Error('Producto o servicio no encontrado');
            }
            return true;
        }),
    manejarResultadosValidacion,
    controladorProductoServicio.eliminar
);

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductoServicio:
 *       type: object
 *       properties:
 *         id_producto:
 *           type: integer
 *         id_empresa:
 *           type: integer
 *         nombre:
 *           type: string
 *         tipo:
 *           type: string
 *         descripcion:
 *           type: string
 *         fecha_lanzamiento:
 *           type: string
 *           format: date
 *         imagen_producto:
 *           type: string
 *     ProductoServicioInput:
 *       type: object
 *       required:
 *         - nombre
 *         - tipo
 *         - id_empresa
 *       properties:
 *         nombre:
 *           type: string
 *         tipo:
 *           type: string
 *         id_empresa:
 *           type: integer
 *         descripcion:
 *           type: string
 *         fecha_lanzamiento:
 *           type: string
 *           format: date
 *         imagen_producto:
 *           type: string
 */

module.exports = router;
