// Importamos `express` para manejar las rutas y solicitudes HTTP en la aplicación.
import express from "express";

// Importamos el controlador de empleados, que contiene las funciones para gestionar los datos de los empleados.
import employeeController from "../controllers/employeeController.js";

// Creamos un enrutador de Express para definir las rutas de la API.
const router = express.Router();

// Definimos una ruta base para manejar operaciones relacionadas con empleados.
// `GET /` -> Obtiene la lista de empleados.
// `POST /` -> Inserta un nuevo empleado.
router.route("/")
  .get(employeeController.getEmployee) // Llama a la función para obtener empleados.
  .post(employeeController.insertEmployee); // Llama a la función para insertar un nuevo empleado.

// Definimos una ruta con un parámetro dinámico `:id`, que representa el ID de un empleado específico.
// `PUT /:id` -> Actualiza un empleado existente basado en su ID.
// `DELETE /:id` -> Elimina un empleado existente basado en su ID.
router.route("/:id")
  .put(employeeController.updateEmployee) // Llama a la función para actualizar un empleado.
  .delete(employeeController.deleteEmployee); // Llama a la función para eliminar un empleado.

// Exportamos el enrutador para usarlo en otras partes de la aplicación.
export default router;
