// Importamos `express` para manejar rutas y solicitudes HTTP en la aplicación.
import express from "express";

// Importamos el controlador de registro de empleados, que contiene la lógica para registrar nuevos empleados.
import registerEmployeeController from "../controllers/registerEmployeeController.js";

// Creamos un enrutador de Express para definir las rutas relacionadas con el registro de empleados.
const router = express.Router();

// `POST /` -> Registra un nuevo empleado en la aplicación llamando a la función correspondiente del controlador.
router.route("/").post(registerEmployeeController.register);

// Exportamos el enrutador para poder utilizarlo en otras partes de la aplicación.
export default router;
