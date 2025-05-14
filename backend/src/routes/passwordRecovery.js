// Importamos `express` para manejar rutas y solicitudes HTTP en la aplicación.
import express from "express";

// Importamos el controlador de recuperación de contraseña, que maneja el proceso de restablecimiento de contraseña.
import passwordRecoveryController from "../controllers/passwordRecoveryController.js";

// Creamos un enrutador de Express para definir las rutas de recuperación de contraseña.
const router = express.Router();

// Definimos las rutas para la recuperación de contraseña.

// `POST /requestCode` -> Genera y envía un código de recuperación al usuario.
router.route("/requestCode").post(passwordRecoveryController.requestCode);

// `POST /verifyCode` -> Verifica si el código proporcionado por el usuario es correcto.
router.route("/verifyCode").post(passwordRecoveryController.verifyCode);

// `POST /newPassword` -> Permite al usuario establecer una nueva contraseña tras la verificación del código.
router.route("/newPassword").post(passwordRecoveryController.newPassword);

// Exportamos el enrutador para usarlo en otras partes de la aplicación.
export default router;
