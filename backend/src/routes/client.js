// Importamos `express` para manejar las rutas y las solicitudes HTTP en la aplicación.
import express from "express";

// Importamos el controlador de clientes, que contiene las funciones para gestionar los datos de los clientes.
import clientController from "../controllers/clientController.js";

// Creamos un enrutador de Express para definir las rutas de la API.
const router = express.Router();

// Definimos una ruta base para manejar operaciones relacionadas con clientes.
// `GET /` -> Obtiene la lista de clientes.
// `POST /` -> Inserta un nuevo cliente.
router.route("/")
  .get(clientController.getClient) // Llama a la función para obtener clientes.
  .post(clientController.insertClient); // Llama a la función para insertar un nuevo cliente.

// Definimos una ruta con un parámetro dinámico `:id`, que representa el ID de un cliente específico.
// `PUT /:id` -> Actualiza un cliente existente basado en su ID.
// `DELETE /:id` -> Elimina un cliente existente basado en su ID.
router.route("/:id")
  .put(clientController.updateClient) // Llama a la función para actualizar un cliente.
  .delete(clientController.deleteClient); // Llama a la función para eliminar un cliente.

// Exportamos el enrutador para usarlo en otras partes de la aplicación.
export default router;
