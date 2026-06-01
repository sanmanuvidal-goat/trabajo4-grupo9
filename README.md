**Programación III - Tecnicatura Universitaria en Programación**

**Profesor**: Gustavo Ramoscelli

**Ayudante**: Maria Victoria Ruiz

**Grupo**: Grupo 9

**Integrantes**: Mazzante Bautista, Vidal Santiago, De Rosa Tiago, Tapuerca Thiago y Wilberger Franco

**Descripcion**: El objetivo de este proyecto es crear una API REST para reemplazar los datos estáticos de una página. El desarrollo aplica el patrón Modelo-Vista-Controlador (MVC) para separar adecuadamente la lógica de datos de las rutas del servidor. Para lograr esto, utilizamos JavaScript (Node.js y Express) para gestionar la lógica en la capa de los controladores y el enrutamiento de los endpoints. Por otro lado, la validación y el tipado estricto de los datos se manejan a través de clases en TypeScript dentro de la capa de los modelos. Para la persistencia de datos, se gestiona la información mediante la lectura y escritura de archivos JSON, simulando así una base de datos. Finalmente, el proyecto se encuentra "dockerizado" y la API está desplegada públicamente utilizando los servicios web de Render.com.

**Enlaces**:

- Link del deploy en Render:
- Link al repositorio con el front-end:
- Documentación con Postman:

**Metologia y Organizacion**

Usamos Github Descktop con una rama principal 'main', una rama 'dev' para pruebas con Render, y ramas individuales por alumno. Realizamos Pull Requests para cada integración. Cada Uno fue avanzando en su propia rama y fuimos subiendo de apoco todo al Dev.

**Division del trabajo**

- Mazzante Bautista:
- Vidal Santiago: modifique un poco el alumno.model.ts, hice el alumno.controller.js y modifique server.js dentro de core
- De Rosa Tiago: Las rutas y Documentacion
- Tapuerca Thiago:
- Wilberger Franco: alumno.model.ts,profesor.model.ts,nota.model.ts,clase.model.ts

**Distribución de los archivos y carpetas**

**models**: Contiene los esquemas de datos y clases desarrolladas en TypeScript. Su función principal es aplicar Programación Orientada a Objetos para modelar las entidades (ej. Alumno.model.ts) y validar estrictamente los datos que ingresan a la API antes de guardarlos.

**controllers**: Aloja la lógica de negocio modularizada y escrita en JavaScript (ej. alumno.controller.js y los módulos opcionales dentro de la subcarpeta extras). Destaca el uso del módulo nativo fs.promises para realizar la lectura/escritura de los archivos JSON de forma asíncrona, capturando excepciones mediante bloques try/catch.

**routes**: Contiene los archivos de enrutamiento desarrollados en JavaScript (ej. alumno.routes.js, materia.routes.js, nota.routes.js y profesor.routes.js). Utiliza el módulo Router de Express para modularizar los endpoints de la API. Su responsabilidad principal es interceptar las peticiones HTTP (GET, POST, PUT, DELETE) apuntadas a cada entidad y delegar la ejecución mapeándolas directamente a las funciones importadas desde sus respectivos controladores.

**data**: Actúa como nuestra base de datos simulada gestionando la persistencia de la información mediante archivos JSON. En su nivel principal contiene el archivo alumnos.json, donde se registran los estudiantes. Además, incluye una subcarpeta /extras con documentos adicionales (sys-materias.json, sys-notas.json y sys-profesores.json) provistos como base para desarrollar las ampliaciones opcionales del proyecto..

**core**: Contiene el archivo server.js, donde se define la clase principal Server. Esta clase centraliza toda la configuración de arranque de la API: inicializa Express, configura las variables de entorno (dotenv) y aplica middlewares esenciales como CORS. Además, es responsable de enlazar los endpoints de la aplicación (como la ruta /alumnos) y cuenta con una serie de middlewares dedicados al manejo global de errores, capturando y respondiendo adecuadamente a estados como 400, 404 (Página no encontrada) y 500 (Internal Server Error).

**app.js**: : Es el archivo de entrada principal del proyecto. Su única responsabilidad es importar la clase Server desde el core, instanciarla y ejecutar el método

**Documentacion De Funciones**

**getAllAlumnos (Controlador - GET)**: \* Lógica: Función asíncrona que se encarga de leer el archivo alumnos.json. Utiliza un bloque try/catch para prevenir caídas del servidor. Parsea la información y la devuelve en formato JSON.

**getAlumnoById (Controlador - GET)**: \* Lógica: Captura el número de legajo enviado por parámetro en la URL (req.params.id). Lee el archivo JSON de forma asíncrona y utiliza el método .find() para buscar al alumno específico dentro del arreglo.

**createAlumno (Controlador - POST)**: \* Lógica: Recibe los datos del nuevo alumno a través del cuerpo de la petición (req.body). Antes de guardarlo, instancia la clase AlumnoModel (desarrollada en TypeScript) para validar que los datos sean correctos. Luego, lee el JSON asíncronamente, verifica que el legajo no esté duplicado, empuja el nuevo objeto al arreglo y reescribe el archivo de texto.

**updateAlumno (Controlador - PUT)**: \* Lógica: Recibe el legajo por la URL (req.params.id) y los datos a actualizar por el req.body. Busca el índice del alumno en el JSON. Tiene una validación estricta para evitar que el número de legajo sea modificado. Si pasa la validación, actualiza las propiedades correspondientes y reescribe el archivo JSON asíncronamente.

**deleteAlumno (Controlador - DELETE)**: \* Lógica: Extrae el legajo desde los parámetros de la URL (req.params.id). Filtra el arreglo del JSON (usualmente con .filter()) para remover por completo al estudiante que coincida con ese legajo. Finalmente, guarda el nuevo arreglo modificado sobrescribiendo el archivo JSON.

**Estructura de Archivos JSON**:

En este proyecto, gestionamos la persistencia de los datos mediante archivos JSON para simular el comportamiento de una base de datos. Al no contar con un motor de base de datos tradicional, estos archivos estáticos permiten realizar todas las operaciones de almacenamiento de la API (Crear, Leer, Actualizar y Eliminar) mediante lecturas y escrituras asíncronas. Además, se respeta estrictamente la directiva de mantener un único arreglo principal global ([]) por cada archivo, lo que garantiza una lectura rápida, un parseo limpio de la información y evita mezclar múltiples entidades en un mismo documento.

**Ejemplo de la estructura de Alumno.json:**

json
[
{
"legajo": 10501,
"nombre": "Tiago",
"apellido": "De Rosa Cajarabilla",
"isActive": true
},
{
"legajo": 10502,
"nombre": "María Victoria",
"apellido": "Ruiz",
"isActive": true
},
{
"legajo": 10503,
"nombre": "Lucas",
"apellido": "Martínez",
"isActive": false
}
]

# Documentación

### El archivo README.md debe incluir lo siguiente:

- Número de grupo e integrantes.
- Nombre del proyecto y su descripción.
- Metodología de trabajo con Git y GitHub.
- División de los archivos entre los integrantes.
- Distribución de los archivos y carpetas.
- Un 90% de las funciones explicadas a detalle.
- Documentación con ‘Postman’ de todos los métodos (GET, PUT, DELETE, POST).
- Mínimo un ejemplo de la estructura de cada archivo JSON utilizado (no integrar varios “arrays” en un mismo archivo).
- Link del deploy en Render.
- Link al repositorio con el front-end.
