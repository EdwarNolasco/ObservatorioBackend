const { validationResult } = require('express-validator');
const EncuestaDemanda = require('../models/encuestaDemanda');
const { Op } = require('sequelize');

const controladorEncuestaDemanda = {};

controladorEncuestaDemanda.listar = async (req, res) => {
  try {
    const encuestas = await EncuestaDemanda.findAll();
    res.json(encuestas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controladorEncuestaDemanda.obtenerPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const encuesta = await EncuestaDemanda.findByPk(id);
    if (!encuesta) {
      return res.status(404).json({ msg: 'Encuesta de demanda no encontrada' });
    }
    res.json(encuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controladorEncuestaDemanda.buscarPorProducto = async (req, res) => {
  const searchTerm = req.query.q;
  try {
    const encuestas = await EncuestaDemanda.findAll({
      where: {
        id_producto: {
          [Op.like]: `${searchTerm}%`
        }
      },
      limit: 20
    });
    if (encuestas.length === 0) {
      return res.status(404).json({ msg: 'No se encontraron encuestas para ese producto' });
    }
    res.json(encuestas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controladorEncuestaDemanda.guardar = async (req, res) => {
  try {
    const nuevaEncuesta = await EncuestaDemanda.create({
      id_producto: req.body.id_producto,
      porcentaje_demanda: req.body.porcentaje_demanda,
      anio: req.body.anio
    });
    res.status(201).json({ 
      mensaje: 'Encuesta de demanda registrada', 
      encuesta: nuevaEncuesta 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controladorEncuestaDemanda.editar = async (req, res) => {
  const id = req.params.id;
  try {
    const encuesta = await EncuestaDemanda.findByPk(id);
    if (!encuesta) {
      return res.status(404).json({ msg: 'Encuesta de demanda no encontrada' });
    }
    await encuesta.update({
      id_producto: req.body.id_producto,
      porcentaje_demanda: req.body.porcentaje_demanda,
      anio: req.body.anio
    });
    res.json({ 
      msg: `Encuesta de demanda con id ${id} actualizada correctamente`,
      encuesta
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controladorEncuestaDemanda.eliminar = async (req, res) => {
  const id = req.params.id;
  try {
    const encuesta = await EncuestaDemanda.findByPk(id);
    if (!encuesta) {
      return res.status(404).json({ msg: 'Encuesta de demanda no encontrada' });
    }
    await encuesta.destroy();
    res.json({ msg: `Encuesta de demanda con id ${id} eliminada correctamente` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = controladorEncuestaDemanda;
