const { Router } = require('express')
const {
  getMateriaAll,
  getMateriaById,
  createMateria,
  updateMateria,
  deleteMateria
} = require('../../controllers/materia.controller')

const rutas = Router()

rutas.get('/', getMateriaAll)
rutas.get('/:id', getMateriaById)
rutas.post('/', createMateria)
rutas.put('/:id', updateMateria)
rutas.delete('/:id', deleteMateria)

module.exports = rutas
