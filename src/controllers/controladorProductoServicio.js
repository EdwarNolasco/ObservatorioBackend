const { validationResult } = require('express-validator');
const ProductoServicio = require('../models/productoservicio');
const { Op } = require('sequelize');

const controladorProductoServicio = {};

controladorProductoServicio.listar = async (req, res) => {
  try {
    const productos = await ProductoServicio.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controladorProductoServicio.obtenerPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const producto = await ProductoServicio.findByPk(id);
    if (!producto) {
      return res.status(404).json({ msg: 'Producto o servicio no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controladorProductoServicio.buscarPorNombre = async (req, res) => {
  const searchTerm = req.query.q;
  try {
    const productos = await ProductoServicio.findAll({
      where: {
        nombre: {
          [Op.like]: `${searchTerm}%`
        }
      },
      limit: 20
    });
    if (productos.length === 0) {
      return res.status(404).json({ msg: 'No se encontraron productos con ese nombre' });
    }
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controladorProductoServicio.guardar = async (req, res) => {
  try {
    const nuevoProducto = await ProductoServicio.create({
      id_empresa: req.body.id_empresa,
      nombre: req.body.nombre,
      tipo: req.body.tipo,
      descripcion: req.body.descripcion,
      fecha_lanzamiento: req.body.fecha_lanzamiento,
      imagen_producto: req.body.imagen_producto
    });
    res.status(201).json({ 
      mensaje: 'Producto o servicio registrado', 
      producto: nuevoProducto 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controladorProductoServicio.editar = async (req, res) => {
  const id = req.params.id;
  try {
    const producto = await ProductoServicio.findByPk(id);
    if (!producto) {
      return res.status(404).json({ msg: 'Producto o servicio no encontrado' });
    }
    await producto.update({
      nombre: req.body.nombre,
      tipo: req.body.tipo,
      descripcion: req.body.descripcion,
      fecha_lanzamiento: req.body.fecha_lanzamiento,
      imagen_producto: req.body.imagen_producto
    });
    res.json({ 
      msg: `Producto o servicio con id ${id} actualizado correctamente`,
      producto
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controladorProductoServicio.eliminar = async (req, res) => {
  const id = req.params.id;
  try {
    const producto = await ProductoServicio.findByPk(id);
    if (!producto) {
      return res.status(404).json({ msg: 'Producto o servicio no encontrado' });
    }
    await producto.destroy();
    res.json({ msg: `Producto o servicio con id ${id} eliminado correctamente` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controladorProductoServicio;
