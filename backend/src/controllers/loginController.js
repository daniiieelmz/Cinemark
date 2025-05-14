// Se define un objeto vacío para almacenar las funciones del controlador de login
const loginController = {}; 

// Se importan los modelos de empleados y clientes desde la carpeta "models"
import employeeModel from "../models/employee.js";
import clientModel from "../models/client.js";

// Se importan las librerías necesarias para la autenticación
import bcryptjs from "bcryptjs"; // Para el cifrado y comparación de contraseñas
import jsonwebtoken from "jsonwebtoken"; // Para la generación de tokens JWT
import { config } from "../config.js"; // Configuración con claves secretas y datos administrativos

// Función para manejar el inicio de sesión
loginController.login = async (req, res) => {
  // Se obtienen el email y la contraseña desde el cuerpo de la solicitud
  const { email, password } = req.body;
  
  try {
    // Definimos variables para almacenar el usuario encontrado y su tipo
    let userFound;
    let userType;

    // 1. Verificamos si es un administrador
    if (email == config.emailAdmin.email && password == config.emailAdmin.password) {
        userType = "Admin";
        userFound = { _id: "Admin" }; // ID ficticio para el administrador
    } else {
        // 2. Buscamos si es un empleado
        userFound = await employeeModel.findOne({ email }); 
        userType = "Employee";

        // 3. Si no encontramos un empleado, verificamos si es un cliente
        if (!userFound) {
            userFound = await clientModel.findOne({ email });
            userType = "Client";
        }
    }

    // Si no encontramos un usuario con el email proporcionado, devolvemos un mensaje de error
    if (!userFound) {
        return res.json({ message: "user not found" });
    }

    // Si el usuario no es administrador, validamos la contraseña
    if (userType !== "Admin") {
        // Comparamos la contraseña ingresada con la almacenada en la base de datos
        const isMatch = await bcryptjs.compare(password, userFound.password);
        if (!isMatch) {
            return res.json({ message: "invalid password" });
        }
    }

    // Generamos un token JWT con la información del usuario autenticado
    jsonwebtoken.sign(
        {
            id: userFound._id, // ID del usuario autenticado
            userType // Tipo de usuario (Admin, Employee, Client)
        },
        config.JWT.secret, // Clave secreta para firmar el token
        { expiresIn: config.JWT.expiresIn }, // Tiempo de expiración del token
        (error, token) => { // Función de callback
            if (error) console.log(error); // Si ocurre un error en la generación del token, lo mostramos en consola
            res.cookie("authToken", token); // Guardamos el token en una cookie
            res.json({ message: "login successful" }); // Enviamos confirmación del inicio de sesión
        }
    );
  } catch (error) {
    // Si hay un error en el proceso, lo registramos en la consola
    console.log(error);
  }
};

// Se exporta el controlador de login para que pueda ser utilizado en otros archivos
export default loginController;
