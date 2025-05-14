// Se importan los módulos necesarios para la recuperación de contraseña
import jsonwebtoken from "jsonwebtoken"; // Para generar y verificar tokens JWT
import bcryptjs from "bcryptjs"; // Para cifrar contraseñas
import clientModel from "../models/client.js"; // Modelo de clientes
import employeeModel from "../models/employee.js"; // Modelo de empleados
import { sendEmail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovery.js"; // Funciones para enviar correos electrónicos
import { config } from "../config.js"; // Archivo de configuración con claves secretas

// 1. Crear un objeto para almacenar las funciones del controlador
const passwordRecoveryController = {};

// 2. Función para solicitar un código de recuperación de contraseña
passwordRecoveryController.requestCode = async (req, res) => {
  const { email } = req.body;

  try {
    let userFound;
    let userType;

    // Buscar si el email pertenece a un cliente
    userFound = await clientModel.findOne({ email });
    if (userFound) {
      userType = "client";
    } else {
      // Si no es cliente, buscar si es un empleado
      userFound = await employeeModel.findOne({ email });
      userType = "employee";
    }

    // Si el usuario no existe en ninguna base de datos, devolver error
    if (!userFound) {
      return res.json({ message: "User not found" });
    }

    // Generar un código aleatorio de 5 dígitos para la verificación
    const code = Math.floor(10000 + Math.random() * 60000).toString();

    // Generar un token JWT con el código y datos del usuario
    const token = jsonwebtoken.sign(
      { email, code, userType, verified: false }, // Datos a almacenar en el token
      config.JWT.secret, // Clave secreta
      { expiresIn: "25m" } // Expiración en 25 minutos
    );

    // Guardar el token en una cookie con duración de 25 minutos
    res.cookie("tokenRecoveryCode", token, { maxAge: 25 * 60 * 1000 });

    // Enviar el correo con el código de verificación
    await sendEmail(
      email,
      "Password recovery Code",
      `Your verification code is ${code}`,
      HTMLRecoveryEmail(code)
    );

    // Confirmar que el código se ha enviado
    res.json({ message: "Verification code sent" });

  } catch (error) {
    console.log("Error: " + error);
  }
};

// 3. Función para verificar el código de recuperación
passwordRecoveryController.verifyCode = async (req, res) => {
  const { code } = req.body;

  try {
    // Obtener el token guardado en las cookies
    const token = req.cookies.tokenRecoveryCode;

    // Decodificar el token para extraer sus datos
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    // Comparar el código guardado en el token con el código proporcionado por el usuario
    if (decoded.code !== code) {
        return res.json({ message: "Invalid code" });
    }

    // Si el código es correcto, generar un nuevo token marcado como verificado
    const newToken = jsonwebtoken.sign(
      { 
        email: decoded.email,
        code: decoded.code,
        userType: decoded.userType,
        verified: true 
      },
      config.JWT.secret,
      { expiresIn: "25m" }
    );

    // Guardar el nuevo token verificado en una cookie
    res.cookie("tokenRecoveryCode", newToken, { maxAge: 25 * 60 * 1000 });

    // Confirmar que el código fue verificado correctamente
    res.json({ message: "Code verified successfully" });

  } catch (error) {
    console.log("Error: " + error);
  }
};

// 4. Función para actualizar la contraseña del usuario
passwordRecoveryController.newPassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    // Obtener el token guardado en las cookies
    const token = req.cookies.tokenRecoveryCode;

    // Decodificar el token para extraer sus datos
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    // Verificar si el código ya fue validado
    if (!decoded.verified) {
      return res.json({ message: "Code not verified" });
    }

    let user;
    const { email } = decoded;

    // Encriptar la nueva contraseña antes de guardarla
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    // Actualizar la contraseña en la base de datos según el tipo de usuario
    if (decoded.userType === "client") {
      user = await clientModel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    } else if (decoded.userType === "employee") {
      user = await employeeModel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    }

    // Eliminar la cookie de recuperación después de cambiar la contraseña
    res.clearCookie("tokenRecoveryCode");

    // Confirmar que la contraseña fue actualizada correctamente
    res.json({ message: "Password updated" });

  } catch (error) {
    console.log("Error: " + error);
  }
};

// 5. Exportar el controlador de recuperación de contraseña
export default passwordRecoveryController;
