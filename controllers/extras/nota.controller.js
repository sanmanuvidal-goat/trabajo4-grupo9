const { NotaModel } = require('../models/extras/nota.model')

const getNotaAll = async (req, res) => {
  try {
    const notas = NotaModel.getAllRaw()
    return res.status(200).json(notas)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'No se pudieron obtener las notas' })
  }
}

const getNotaById = async (req, res) => {
  try {
    const { id } = req.params // Suponiendo que el ID de la nota es único
    const notas = NotaModel.getAllRaw()
    const nota = notas.find((n) => n.id === Number(id))

    if (!nota) {
      return res.status(404).json({ msg: `No existe la nota con ID ${id}` })
    }
    return res.status(200).json(nota)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al buscar la nota' })
  }
}

const createNota = async (req, res) => {
  try {
    const { id, alumnoLegajo, materiaId, valor } = req.body

    if (!id || !alumnoLegajo || !materiaId || valor === undefined) {
      return res
        .status(400)
        .json({ error: 'Todos los campos son obligatorios' })
    }

    const notas = NotaModel.getAllRaw()
    if (notas.some((n) => n.id === Number(id))) {
      return res.status(409).json({ error: `La nota con ID ${id} ya existe` })
    }

    const nuevaNota = {
      id: Number(id),
      alumnoLegajo: Number(alumnoLegajo),
      materiaId: Number(materiaId),
      valor: Number(valor)
    }
    notas.push(nuevaNota)
    NotaModel.saveAll(notas)

    return res
      .status(201)
      .json({ msg: 'Nota registrada con éxito', nota: nuevaNota })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error interno al registrar la nota' })
  }
}

const updateNota = async (req, res) => {
  try {
    const { id } = req.params
    const { valor } = req.body
    const notas = NotaModel.getAllRaw()
    const indice = notas.findIndex((n) => n.id === Number(id))

    if (indice === -1) {
      return res.status(404).json({ msg: `No existe la nota con ID ${id}` })
    }

    if (valor !== undefined) notas[indice].valor = Number(valor)

    NotaModel.saveAll(notas)
    return res
      .status(200)
      .json({ msg: 'Nota actualizada con éxito', nota: notas[indice] })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error interno al modificar la nota' })
  }
}

const deleteNota = async (req, res) => {
  try {
    const { id } = req.params
    let notas = NotaModel.getAllRaw()

    if (!notas.some((n) => n.id === Number(id))) {
      return res.status(404).json({ msg: `No existe la nota con ID ${id}` })
    }

    notas = notas.filter((n) => n.id !== Number(id))
    NotaModel.saveAll(notas)
    return res.status(200).json({ msg: `Nota con ID ${id} eliminada` })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error interno al eliminar la nota' })
  }
}

module.exports = { getNotaAll, getNotaById, createNota, updateNota, deleteNota }
