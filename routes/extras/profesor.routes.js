const { Router } = require('express')
const {
  getProfesorAll,
  getProfesorById,
  createProfesor,
  updateProfesor,
  deleteProfesor
} = require('../../controllers/profesor.controller')

const rutas = Router()

rutas.get('/', getProfesorAll)
rutas.get('/:id', getProfesorById)
rutas.post('/', createProfesor)
rutas.put('/:id', updateProfesor)
rutas.delete('/:id', deleteProfesor)

module.exports = rutas
