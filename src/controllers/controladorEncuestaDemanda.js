const { EncuestaDemanda, ProductoServicio, Pais } = require('../../models'); // Ajusta la ruta si es necesario

exports.getAllEncuestasDemanda = async (req, res) => {
  try {
    const encuestasDemanda = await EncuestaDemanda.findAll({
      include: [
        { model: ProductoServicio, attributes: ['nombre', 'tipo'] },
        { model: Pais, attributes: ['nombre_pais'] }
      ],
    });
    res.status(200).json(encuestasDemanda);
  } catch (error) {
    console.error('Error al obtener encuestas de demanda:', error);
    res.status(500).json({ message: 'Error al obtener encuestas de demanda', error: error.message });
  }
};

exports.getEncuestaDemandaById = async (req, res) => {
  try {
    const { id } = req.params;
    const encuestaDemanda = await EncuestaDemanda.findByPk(id, {
      include: [
        { model: ProductoServicio, attributes: ['nombre', 'tipo'] },
        { model: Pais, attributes: ['nombre_pais'] }
      ],
    });
    if (!encuestaDemanda) {
      return res.status(404).json({ message: 'Encuesta de demanda no encontrada' });
    }
    res.status(200).json(encuestaDemanda);
  } catch (error) {
    console.error(`Error al obtener encuesta de demanda con ID ${id}:`, error);
    res.status(500).json({ message: 'Error al obtener encuesta de demanda', error: error.message });
  }
};

exports.createEncuestaDemanda = async (req, res) => {
  try {
    const { id_producto, id_pais, porcentaje_demanda, anio } = req.body;
    const newEncuestaDemanda = await EncuestaDemanda.create({
      id_producto,
      id_pais,
      porcentaje_demanda,
      anio,
    });
    res.status(201).json(newEncuestaDemanda);
  } catch (error) {
    console.error('Error al crear encuesta de demanda:', error);
    res.status(500).json({ message: 'Error al crear encuesta de demanda', error: error.message });
  }
};

exports.updateEncuestaDemanda = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_producto, id_pais, porcentaje_demanda, anio } = req.body;
    const [updatedRows] = await EncuestaDemanda.update(
      { id_producto, id_pais, porcentaje_demanda, anio },
      { where: { id_encuesta: id } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Encuesta de demanda no encontrada' });
    }
    const updatedEncuestaDemanda = await EncuestaDemanda.findByPk(id);
    res.status(200).json(updatedEncuestaDemanda);
  } catch (error) {
    console.error(`Error al actualizar encuesta de demanda con ID ${id}:`, error);
    res.status(500).json({ message: 'Error al actualizar encuesta de demanda', error: error.message });
  }
};

exports.deleteEncuestaDemanda = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await EncuestaDemanda.destroy({
      where: { id_encuesta: id },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Encuesta de demanda no encontrada' });
    }
    res.status(204).send(); // No Content
  } catch (error) {
    console.error(`Error al eliminar encuesta de demanda con ID ${id}:`, error);
    res.status(500).json({ message: 'Error al eliminar encuesta de demanda', error: error.message });
  }
};
