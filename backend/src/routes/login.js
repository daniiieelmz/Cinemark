// Importamos `express` para manejar rutas y solicitudes HTTP en la aplicación.
import express from "express";

// Importamos el controlador de inicio de sesión, que contiene la lógica para autenticar usuarios.
import loginController from "../controllers/loginController.js";

// Creamos un enrutador de Express para definir las rutas relacionadas con el inicio de sesión.
const router = express.Router();

// Definimos una única ruta para la autenticación de usuarios.
// `POST /` -> Envía los datos de inicio de sesión y permite la autenticación.
router.route("/").post(loginController.login); // Llama a la función `login` dentro del controlador.

// Exportamos el enrutador para poder utilizarlo en otras partes de la aplicación.
export default router;
