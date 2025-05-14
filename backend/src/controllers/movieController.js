// Se importa el modelo de películas desde la carpeta "models"
import movieModel from "../models/movie.js";

// Se importa Cloudinary para la gestión de imágenes
import { v2 as cloudinary } from "cloudinary";

// Se importa la configuración general
import { config } from "../config.js";
 
// 1. Configurar Cloudinary con las credenciales del archivo config.js
cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
});
 
// 2. Se define un objeto vacío para almacenar las funciones del controlador de películas
const moviesController = {};
 
// 3. Función para obtener todas las películas almacenadas en la base de datos
moviesController.getAllPosts = async (req, res) => {
    // Se busca todos los registros de películas en la base de datos
    const posts = await movieModel.find();
    // Se envían los resultados en formato JSON
    res.json(posts);
};

// 4. Función para subir un post al blog
moviesController.createPost = async (req, res) => {
    try {
        // Se extraen los datos enviados en el cuerpo de la solicitud (req.body)
        const { title, description, director, gender, year, duration } = req.body;
        
        let imageUrl = ""; // Se inicializa la variable para la URL de la imagen

        // Si se sube un archivo, se procesa y se sube a Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(
                req.file.path, // Se obtiene la ruta del archivo subido
                {
                    folder: "public", // Se guarda la imagen en la carpeta "public" en Cloudinary
                    allowed_formats: ["jpg", "png", "jpeg"] // Se permite solo estos formatos
                }
            );
            // Se obtiene la URL segura de la imagen
            imageUrl = result.secure_url;
        }

        // Se crea un nuevo post con los datos obtenidos, incluyendo la imagen si se subió
        const newPost = new movieModel({
            title, 
            description, 
            director, 
            gender, 
            year, 
            duration, 
            image: imageUrl
        });

        // Se guarda el nuevo post en la base de datos
        await newPost.save();

        // Se envía un mensaje de confirmación
        res.json({ message: "post saved" });

    } catch (error) {
        // Se muestra el error en la consola para depuración
        console.log("Error: " + error);
    }
};

// Se exporta el controlador de películas para que pueda ser utilizado en otros archivos
export default moviesController;
