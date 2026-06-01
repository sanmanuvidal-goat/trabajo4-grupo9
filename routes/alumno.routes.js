const express = require('express')
const router = express.Router()

// Importamos todas las funciones del controlador de alumnos
const alumnoController = require('../controllers/alumno.controller')

// 1. Obtener todos los alumnos
router.get('/', alumnoController.getAlumnoAll)

// 2. Obtener un alumno específico por su legajo
router.get('/:id', alumnoController.getAlumnoById)

// 3. Crear un nuevo alumno
router.post('/', alumnoController.createAlumno)

// 4. Modificar los datos de un alumno existente por su legajo
router.put('/:id', alumnoController.updateAlumno)

// 5. Eliminar un alumno por completo de la persistencia por su legajo
router.delete('/:id', alumnoController.deleteAlumno)

// Exportamos el enrutador para que Express lo pueda consumir desde app.js
module.exports = router
