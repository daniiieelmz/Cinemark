// Se define un objeto vacío para almacenar las funciones del controlador
const clientsController = {}; 

// Se importa el modelo de clientes desde la carpeta "models"
import clientModel from "../models/client.js"; 

// Función para obtener todos los clientes de la base de datos
clientsController.getClient = async (req, res) => {
  // Se busca todos los registros de clientes en la base de datos
  const clients = await clientModel.find(); 
  // Se envían los clientes encontrados en formato JSON como respuesta
  res.json(clients);
};

// Función para insertar un nuevo cliente en la base de datos
clientsController.insertClient = async (req, res) => {
  // Se extraen los datos enviados en el cuerpo de la solicitud (req.body)
  const { name, email, password, telephone, address, status } = req.body;
  // Se crea un nuevo objeto de cliente con los datos obtenidos
  const newClient = new clientModel({ name, email, password, telephone, address, status });
  // Se guarda el nuevo cliente en la base de datos
  await newClient.save();
  // Se envía un mensaje de confirmación
  res.json({ message: "client saved" });
};

// Función para eliminar un cliente por su ID
clientsController.deleteClient = async (req, res) => {
  // Se busca y elimina el cliente con el ID recibido en los parámetros de la solicitud
  await clientModel.findByIdAndDelete(req.params.id);
  // Se envía un mensaje de confirmación
  res.json({ message: "client deleted" });
};

// Función para actualizar los datos de un cliente
clientsController.updateClient = async (req, res) => {
  // Se extraen los datos enviados en el cuerpo de la solicitud
  const { name, email, password, telephone, address, status } = req.body;
  
  // Se busca el cliente por su ID y se actualizan sus datos
  const updateClient = await clientModel.findByIdAndUpdate(
    req.params.id, 
    { name, email, password, telephone, address, status }, 
    { new: true } // Se configura para devolver el cliente actualizado
  );

  // Si el cliente no fue encontrado, se envía un mensaje de error
  if (!updateClient) {
    res.json({ message: "client not found" });
  } else {
    // Si el cliente fue actualizado exitosamente, se envía un mensaje de confirmación
    res.json({ message: "client updated" });
  }
};

// Se exporta el objeto del controlador para que pueda ser utilizado en otros archivos
export default clientsController;
