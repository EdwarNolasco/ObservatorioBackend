const express = require('express');
const { body, param } = require('express-validator');
const passport = require('../config/passport');
const controladorProductoServicio = require('../controllers/controladorProductoServicio');
const router = express.Router();
/**
 * @swagger
 * tags:
 * name: Productos y Servicios
 * description: API para la gestión de productos y servicios
 */

/**
 * @swagger
 * /api/productos-servicios:
 * get:
 * summary: Obtener todos los productos y servicios
 * tags: [Productos y Servicios]
 * responses:
 * 200:
 * description: Lista de productos y servicios
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/ProductoServicio'
 * 500:
 * description: Error del servidor
 */
router.get('/', controladorProductoServicio.getAllProductosServicios);

/**
 * @swagger
 * /api/productos-servicios/{id}:
 * get:
 * summary: Obtener un producto o servicio por ID
 * tags: [Productos y Servicios]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID del producto o servicio
 * responses:
 * 200:
 * description: Información del producto o servicio
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ProductoServicio'
 * 404:
 * description: Producto o servicio no encontrado
 * 500:
 * description: Error del servidor
 */
router.get('/:id', controladorProductoServicio.getProductoServicioById);

/**
 * @swagger
 * /api/productos-servicios:
 * post:
 * summary: Crear un nuevo producto o servicio
 * tags: [Productos y Servicios]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ProductoServicioInput'
 * responses:
 * 201:
 * description: Producto o servicio creado exitosamente
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ProductoServicio'
 * 500:
 * description: Error del servidor
 */
router.post('/', controladorProductoServicio.createProductoServicio);

/**
 * @swagger
 * /api/productos-servicios/{id}:
 * put:
 * summary: Actualizar un producto o servicio existente
 * tags: [Productos y Servicios]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID del producto o servicio
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ProductoServicioInput'
 * responses:
 * 200:
 * description: Producto o servicio actualizado exitosamente
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ProductoServicio'
 * 404:
 * description: Producto o servicio no encontrado
 * 500:
 * description: Error del servidor
 */
router.put('/:id', controladorProductoServicio.updateProductoServicio);

/**
 * @swagger
 * /api/productos-servicios/{id}:
 * delete:
 * summary: Eliminar un producto o servicio
 * tags: [Productos y Servicios]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID del producto o servicio
 * responses:
 * 204:
 * description: Producto o servicio eliminado exitosamente (No Content)
 * 404:
 * description: Producto o servicio no encontrado
 * 500:
 * description: Error del servidor
 */
router.delete('/:id', controladorProductoServicio.deleteProductoServicio);


module.exports = router;
