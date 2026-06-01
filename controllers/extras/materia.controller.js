const { MateriaModel } = require('../models/extras/materia.model');

const getMateriaAll = async (req, res) => {
  try {
    const materias = await MateriaModel.getAllRaw();
    return res.status(200).json(materias);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'No se pudieron obtener las materias' });
  }
};

const getMateriaById = async (req, res) => {
  try {
    const { id } = req.params;

    const materias = await MateriaModel.getAllRaw();

    const materia = materias.find(m => m.id === Number(id));

    if (!materia) {
      return res.status(404).json({ msg: `No existe la materia con el ID ${id}` });
    }

    return res.status(200).json(materia);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: `Error al buscar la materia n° ${req.params.id}` });
  }
};

const createMateria = async (req, res) => {
  try {
    const { id, nombre, cuatrimestre } = req.body;

    if (!id || !nombre || !cuatrimestre) {
      return res.status(400).json({
        error: 'Todos los campos (id, nombre, cuatrimestre) son obligatorios'
      });
    }

    const materias = await MateriaModel.getAllRaw();

    if (materias.some(m => m.id === Number(id))) {
      return res.status(409).json({
        error: `La materia con ID ${id} ya existe`
      });
    }

    const nuevaMateria = {
      id: Number(id),
      nombre,
      cuatrimestre,
      isActive: true
    };

    materias.push(nuevaMateria);

    await MateriaModel.saveAll(materias);

    return res.status(201).json({
      msg: 'Materia creada con éxito',
      materia: nuevaMateria
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Error interno al crear la materia'
    });
  }
};

const updateMateria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, cuatrimestre, isActive } = req.body;

    const materias = await MateriaModel.getAllRaw();

    const indice = materias.findIndex(m => m.id === Number(id));

    if (indice === -1) {
      return res.status(404).json({
        msg: `No existe la materia con ID ${id}`
      });
    }

    if (nombre) materias[indice].nombre = nombre;
    if (cuatrimestre) materias[indice].cuatrimestre = cuatrimestre;
    if (isActive !== undefined) materias[indice].isActive = isActive;

    await MateriaModel.saveAll(materias);

    return res.status(200).json({
      msg: 'Materia modificada con éxito',
      materia: materias[indice]
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Error interno al modificar la materia'
    });
  }
};

const deleteMateria = async (req, res) => {
  try {
    const { id } = req.params;

    let materias = await MateriaModel.getAllRaw();

    if (!materias.some(m => m.id === Number(id))) {
      return res.status(404).json({
        msg: `No existe la materia con ID ${id}`
      });
    }

    materias = materias.filter(m => m.id !== Number(id));

    await MateriaModel.saveAll(materias);

    return res.status(200).json({
      msg: `Materia con ID ${id} eliminada`
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Error interno al eliminar la materia'
    });
  }
};

module.exports = {
  getMateriaAll,
  getMateriaById,
  createMateria,
  updateMateria,
  deleteMateria
};

