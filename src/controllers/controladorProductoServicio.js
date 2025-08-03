const { ProductoServicio, Empresa } = require('../../models'); // Ajusta la ruta si es necesario

exports.getAllProductosServicios = async (req, res) => {
  try {
    const productosServicios = await ProductoServicio.findAll({
      include: [{ model: Empresa, attributes: ['nombre_empresa'] }],
    });
    res.status(200).json(productosServicios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener productos/servicios', error: error.message });
  }
};

exports.getProductoServicioById = async (req, res) => {
  try {
    const { id } = req.params;
    const productoServicio = await ProductoServicio.findByPk(id, {
      include: [{ model: Empresa, attributes: ['nombre_empresa'] }],
    });
    if (!productoServicio) {
      return res.status(404).json({ message: 'Producto/Servicio no encontrado' });
    }
    res.status(200).json(productoServicio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener producto/servicio', error: error.message });
  }
};

exports.createProductoServicio = async (req, res) => {
  try {
    const { id_empresa, nombre, tipo, descripcion, fecha_lanzamiento } = req.body;
    const newProductoServicio = await ProductoServicio.create({
      id_empresa,
      nombre,
      tipo,
      descripcion,
      fecha_lanzamiento,
    });
    res.status(201).json(newProductoServicio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear producto/servicio', error: error.message });
  }
};

exports.updateProductoServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_empresa, nombre, tipo, descripcion, fecha_lanzamiento } = req.body;
    const [updatedRows] = await ProductoServicio.update(
      { id_empresa, nombre, tipo, descripcion, fecha_lanzamiento },
      { where: { id_producto: id } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Producto/Servicio no encontrado' });
    }
    const updatedProductoServicio = await ProductoServicio.findByPk(id);
    res.status(200).json(updatedProductoServicio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar producto/servicio', error: error.message });
  }
};

exports.deleteProductoServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await ProductoServicio.destroy({
      where: { id_producto: id },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Producto/Servicio no encontrado' });
    }
    res.status(204).send(); // No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar producto/servicio', error: error.message });
  }
};
