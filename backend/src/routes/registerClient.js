// Importamos `express` para manejar rutas y solicitudes HTTP en la aplicación.
import express from "express";

// Importamos el controlador de registro de clientes, que maneja la lógica para registrar y verificar cuentas.
import registerClientController from "../controllers/registerClientController.js";

// Creamos un enrutador de Express para definir las rutas relacionadas con el registro de clientes.
const router = express.Router();

// `POST /` -> Registra un nuevo cliente en la aplicación.
router.route("/").post(registerClientController.register);

// `POST /verifyCodeEmail` -> Verifica el código enviado al correo electrónico del cliente.
router.route("/verifyCodeEmail").post(registerClientController.verifyCodeEmail);

// Exportamos el enrutador para poder utilizarlo en otras partes de la aplicación.
export default router;
