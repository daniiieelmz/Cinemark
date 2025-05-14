// Importamos `express` para manejar rutas y solicitudes HTTP en la aplicación.
import express from "express";

// Importamos el controlador de cierre de sesión, que contiene la lógica para terminar la sesión del usuario.
import logOutController from "../controllers/logOutController.js";

// Creamos un enrutador de Express para definir la ruta relacionada con el cierre de sesión.
const router = express.Router();

// Definimos una ruta para manejar la acción de cerrar sesión.
// `POST /` -> Llama a la función `logOut`, que se encarga de finalizar la sesión del usuario.
router.route("/").post(logOutController.logOut);

// Exportamos el enrutador para poder utilizarlo en otras partes de la aplicación.
export default router;
