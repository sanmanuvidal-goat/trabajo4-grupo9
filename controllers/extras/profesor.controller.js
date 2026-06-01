const { ProfesorModel } = require('../models/extras/profesor.model')

const getProfesorAll = async (req, res) => {
  try {
    const profesores = ProfesorModel.getAllRaw()
    return res.status(200).json(profesores)
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: 'No se pudieron obtener los profesores' })
  }
}

const getProfesorById = async (req, res) => {
  try {
    const { id } = req.params // ID o legajo del profesor
    const profesores = ProfesorModel.getAllRaw()
    const profesor = profesores.find((p) => p.id === Number(id))

    if (!profesor) {
      return res.status(404).json({ msg: `No existe el profesor con ID ${id}` })
    }
    return res.status(200).json(profesor)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al buscar al profesor' })
  }
}

const createProfesor = async (req, res) => {
  try {
    const { id, nombre, apellido, email } = req.body

    if (!id || !nombre || !apellido || !email) {
      return res
        .status(400)
        .json({ error: 'Todos los campos son obligatorios' })
    }

    const profesores = ProfesorModel.getAllRaw()
    if (profesores.some((p) => p.id === Number(id))) {
      return res
        .status(409)
        .json({ error: `El profesor con ID ${id} ya existe` })
    }

    // Instancia conceptual de POO
    const nuevoProfesor = {
      id: Number(id),
      nombre,
      apellido,
      email,
      isActive: true
    }
    profesores.push(nuevoProfesor)
    ProfesorModel.saveAll(profesores)

    return res
      .status(201)
      .json({ msg: 'Profesor registrado con éxito', profesor: nuevoProfesor })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: 'Error interno al registrar al profesor' })
  }
}

const updateProfesor = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, apellido, email, isActive } = req.body
    const profesores = ProfesorModel.getAllRaw()
    const indice = profesores.findIndex((p) => p.id === Number(id))

    if (indice === -1) {
      return res.status(404).json({ msg: `No existe el profesor con ID ${id}` })
    }

    if (nombre) profesores[indice].nombre = nombre
    if (apellido) profesores[indice].apellido = apellido
    if (email) profesores[indice].email = email
    if (isActive !== undefined) profesores[indice].isActive = isActive

    ProfesorModel.saveAll(profesores)
    return res
      .status(200)
      .json({
        msg: 'Profesor modificado con éxito',
        profesor: profesores[indice]
      })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: 'Error interno al modificar al profesor' })
  }
}

const deleteProfesor = async (req, res) => {
  try {
    const { id } = req.params
    let profesores = ProfesorModel.getAllRaw()

    if (!profesores.some((p) => p.id === Number(id))) {
      return res.status(404).json({ msg: `No existe el profesor con ID ${id}` })
    }

    profesores = profesores.filter((p) => p.id !== Number(id))
    ProfesorModel.saveAll(profesores)
    return res.status(200).json({ msg: `Profesor con ID ${id} eliminado` })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: 'Error interno al eliminar al profesor' })
  }
}

module.exports = {
  getProfesorAll,
  getProfesorById,
  createProfesor,
  updateProfesor,
  deleteProfesor
}
