// Se define un objeto vacío para almacenar las funciones del controlador de registro de empleados
const registerEmployeeController = {}; 

// Se importa el modelo de empleados desde la carpeta "models"
import employeeModel from "../models/employee.js"; // Corrección: "employee" → "employeeModel"

// Se importan los módulos necesarios para el cifrado y autenticación
import bcryptjs from "bcryptjs"; // Para encriptar contraseñas
import jsonwebtoken from "jsonwebtoken"; // Para generar tokens JWT
import { config } from "../config.js"; // Archivo de configuración con claves secretas

// Función para registrar un nuevo empleado
registerEmployeeController.register = async (req, res) => {
  // Se extraen los datos enviados en el cuerpo de la solicitud (req.body)
  const { name, email, password, telephone, address, hireDate, salary, status } = req.body;

  try {
    // Verificar si el empleado ya existe en la base de datos
    const existEmployee = await employeeModel.findOne({ email }); // Corrección: "Employee" → "employeeModel"
    if (existEmployee) {
        return res.json({ message: "Employee already exists" });
    }

    // Encriptar la contraseña antes de guardarla
    const passwordHash = await bcryptjs.hash(password, 10);

    // Crear un nuevo empleado con los datos proporcionados
    const newEmployee = new employeeModel({ name, email, password: passwordHash, telephone, address, hireDate, salary, status }); // Corrección: "Employee" → "employeeModel"
    await newEmployee.save();

    // Enviar confirmación de registro exitoso
    res.json({ message: "Employee saved" });

    // Generar un token JWT para autenticación del nuevo empleado
    jsonwebtoken.sign(
        { id: newEmployee._id }, // Datos a almacenar en el token
        config.JWT.secret, // Clave secreta
        { expiresIn: config.JWT.expiresIn }, // Expiración del token
        (error, token) => { // Función de callback
            if (error) {
                console.log(error);
            } else {
                res.cookie("authToken", token); // Guardar el token en una cookie
            }
        }
    );

  } catch (error) {
    // Manejo de errores
    console.log("Error: " + error);
    res.json({ message: "Error registering employee" });
  }
};

// Exportar el controlador de registro de empleados
export default registerEmployeeController;
