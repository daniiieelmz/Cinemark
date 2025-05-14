// Se importan los módulos necesarios para el registro de clientes
import bcryptjs from "bcryptjs"; // Para encriptar contraseñas
import jsonwebtoken from "jsonwebtoken"; // Para generar y verificar tokens JWT
import nodemailer from "nodemailer"; // Para enviar correos electrónicos
import crypto from "crypto"; // Para generar códigos de verificación aleatorios
import clientModel from "../models/client.js"; // Modelo de clientes
import { config } from "../config.js"; // Archivo de configuración con claves secretas

// Se define un objeto vacío para almacenar las funciones del controlador
const registerClientController = {};

// Función para registrar un nuevo cliente
registerClientController.register = async (req, res) => {
    const { name, email, password, telephone, address, status } = req.body;

    try {
        // Verificar si el cliente ya existe en la base de datos
        const existClient = await clientModel.findOne({ email }); // CORRECCIÓN: `clientsModel` → `clientModel`
        if (existClient) {
            return res.json({ message: "client already exists" });
        }

        // Encriptar la contraseña antes de guardarla
        const passwordHash = await bcryptjs.hash(password, 10);

        // Crear un nuevo cliente con los datos proporcionados
        const newClient = new clientModel({ name, email, password: passwordHash, telephone, address, status });
        await newClient.save();

        // Generar un código aleatorio de verificación
        const verificationCode = crypto.randomBytes(3).toString("hex");

        // Generar un token JWT con el código de verificación
        const tokenCode = jsonwebtoken.sign(
            { email, verificationCode }, // Datos a almacenar en el token
            config.JWT.secret, // Clave secreta
            { expiresIn: "15d" } // Expiración del token en 15 días
        );

        // Guardar el token en una cookie con duración de 2 horas
        res.cookie("VerificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

        // Configurar el servicio de correo electrónico para enviar el código de verificación
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.email_user,
                pass: config.email.email_password
            }
        });

        // Definir las opciones del correo electrónico
        const mailOptions = {
            from: config.email.email_user, // Remitente
            to: email, // Destinatario
            subject: "Verificación de correo", // Asunto del correo
            text: `Para verificar tu correo, utiliza el siguiente código: ${verificationCode}\nEl código vence en dos horas`
        };

        // Enviar el correo con el código de verificación
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return res.json({ message: "Error al enviar el correo" });
            console.log("Correo enviado: " + info.response);
        });

        res.json({ message: "Client registered. Please verify your email with the code" });

    } catch (error) {
        res.json({ message: "Error: " + error });
    }
};

// Función para verificar el código enviado al correo
registerClientController.verifyCodeEmail = async (req, res) => {
    const { verificationCode } = req.body;
    const token = req.cookies.VerificationToken;

    try {
        // Verificar y decodificar el token almacenado en las cookies
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const { email, verificationCode: storedCode } = decoded;

        // Comparar el código guardado en el token con el proporcionado por el usuario
        if (verificationCode !== storedCode) {
            return res.json({ message: "Invalid code" });
        }

        // Actualizar el estado del cliente a "verificado"
        const client = await clientModel.findOne({ email });
        client.isVerified = true;
        await client.save();

        res.json({ message: "Email verified successfully" });

        // Eliminar la cookie con el token después de verificar el código
        res.clearCookie("VerificationToken");

    } catch (error) {
        res.json({ message: "Error: " + error });
    }
};

// Exportar el controlador de registro de clientes para su uso en otros archivos
export default registerClientController;
