// Importamos `express` para manejar las rutas y solicitudes HTTP en la aplicación.
import express from "express";

// Importamos `multer`, que nos permite gestionar la subida de archivos en las solicitudes HTTP.
import multer from "multer";

// Importamos el controlador de películas, que contiene las funciones para manejar los datos de películas.
import movieController from "../controllers/movieController.js";

// Creamos un enrutador de Express para definir las rutas de la API.
const router = express.Router();

// Configuramos `multer` para almacenar los archivos subidos en la carpeta `public/`.
const upload = multer({ dest: "public/" });

// Definimos una ruta para obtener todas las películas y agregar una nueva película con imagen.
// `GET /` -> Obtiene todas las películas.
// `POST /` -> Crea una nueva película y permite subir una imagen.
router.route("/")
  .get(movieController.getAllPosts) // Llama a la función para obtener todas las películas.
  .post(upload.single("image"), movieController.createPost); // Maneja la subida de archivos y la creación de películas.

// Exportamos el enrutador para poder utilizarlo en otras partes de la aplicación.
export default router;
