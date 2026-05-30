// Importamos la clase TypeScript compilada/ejecutada por ts-node
const { AlumnoModel } = require('../models/alumno.model');

/**
 * GET /alumnos
 * Retorna la lista completa de alumnos
 */
const getAlumnoAll = async (req, res) => {
  try {
    const alumnos = await AlumnoModel.getAllRaw();
    return res.status(200).json(alumnos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'No se pudieron obtener los datos de los alumnos' });
  }
};

/**
 * GET /alumnos/:id
 * Busca un alumno por legajo (id)
 */
const getAlumnoById = async (req, res) => {
  try {
    const { id } = req.params;
    const alumnos = await AlumnoModel.getAllRaw();
    
    const alumnoEncontrado = alumnos.find(a => a.legajo === Number(id));

    if (!alumnoEncontrado) {
      return res.status(404).json({ msg: `No existe el alumno con el legajo ${id}` });
    }

    return res.status(200).json(alumnoEncontrado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: `No se pudo obtener el detalle del alumno con legajo n° ${req.params.id}` });
  }
};

/**
 * POST /alumnos
 * Inserta un nuevo alumno validando que no esté repetido
 */
const createAlumno = async (req, res) => {
  try {
    const { legajo, nombre, apellido, email } = req.body;

    // Validación de campos obligatorios (HTTP 400)
    if (!legajo || !nombre || !apellido || !email) {
      return res.status(400).json({ error: 'Todos los campos (legajo, nombre, apellido, email) son obligatorios' });
    }

    const alumnos = await AlumnoModel.getAllRaw();

    // Validar si el legajo ya existe (HTTP 409 Conflict)
    const existeLegajo = alumnos.some(a => a.legajo === Number(legajo));
    if (existeLegajo) {
      return res.status(409).json({ error: `El número de legajo ${legajo} ya se encuentra registrado` });
    }

    // Instanciamos usando la clase para aplicar lógica de POO 
    const nuevoAlumnoInstancia = new AlumnoModel({
      legajo: Number(legajo),
      nombre,
      apellido,
      email,
      fechaAlta: new Date().toISOString().split('T')[0], // YYYY-MM-DD actual
      modificacion: new Date().toISOString().split('T')[0],
      isActive: true
    });

    // Pasamos el objeto plano al JSON
    alumnos.push({
      legajo: nuevoAlumnoInstancia.getLegajo(),
      nombre: nuevoAlumnoInstancia.nombre,
      apellido: nuevoAlumnoInstancia.apellido,
      email: nuevoAlumnoInstancia.email,
      fechaAlta: nuevoAlumnoInstancia.fechaAlta,
      modificacion: nuevoAlumnoInstancia.modificacion,
      isActive: nuevoAlumnoInstancia.isActive
    });

    await AlumnoModel.saveAll(alumnos);
    return res.status(201).json({ msg: 'Alumno registrado con éxito', alumno: nuevoAlumnoInstancia });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno al intentar registrar el alumno' });
  }
};

/** 
 * PUT /alumnos/:id
 * Modifica las propiedades permitidas de un alumno existente
 */
const updateAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, isActive } = req.body;
    
    const alumnos = await AlumnoModel.getAllRaw();
    const indice = alumnos.findIndex(a => a.legajo === Number(id));

    if (indice === -1) {
      return res.status(404).json({ msg: `No existe el alumno con el legajo ${id}` });
    }

    // Actualizamos solo los campos provistos sin tocar el número de legajo
    if (nombre) alumnos[indice].nombre = nombre;
    if (apellido) alumnos[indice].apellido = apellido;
    if (email) alumnos[indice].email = email;
    if (isActive !== undefined) alumnos[indice].isActive = isActive;
    
    alumnos[indice].modificacion = new Date().toISOString().split('T')[0];

    await AlumnoModel.saveAll(alumnos);
    return res.status(200).json({ msg: 'Datos actualizados con éxito', alumno: alumnos[indice] });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno al intentar modificar el alumno' });
  }
};

/**
 * DELETE /alumnos/:id
 * Remueve por completo al estudiante del array de datos
 */
const deleteAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    let alumnos = await AlumnoModel.getAllRaw();
    
    const existe = alumnos.some(a => a.legajo === Number(id));
    if (!existe) {
      return res.status(404).json({ msg: `No existe el alumno con el legajo ${id}` });
    }

    // Filtramos para remover por completo al estudiante del array
    alumnos = alumnos.filter(a => a.legajo !== Number(id));
    
    await AlumnoModel.saveAll(alumnos);
    return res.status(200).json({ msg: `Alumno con legajo ${id} eliminado correctamente` });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno al intentar eliminar el alumno' });
  }
};

module.exports = { 
  getAlumnoAll, 
  getAlumnoById,
  createAlumno,
  updateAlumno,
  deleteAlumno 
};