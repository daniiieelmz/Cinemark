// Se define un objeto vacío para almacenar las funciones del controlador
const employeeController = {}; 

// Se importa el modelo de empleados desde la carpeta "models"
import employeeModel from "../models/employee.js"; 

// Función para obtener todos los empleados de la base de datos
employeeController.getEmployee = async (req, res) => {
  // Se busca todos los registros de empleados en la base de datos
  const employees = await employeeModel.find(); 
  
  // ¡Error aquí! Se intenta enviar "employee" en lugar de "employees"
  // Debe corregirse como:
  res.json(employees);
};

// Función para insertar un nuevo empleado en la base de datos
employeeController.insertEmployee = async (req, res) => {
  // Se extraen los datos enviados en el cuerpo de la solicitud (req.body)
  const { name, email, password, telephone, address, hireDate, salary, status } = req.body;
  
  // Se crea un nuevo objeto de empleado con los datos obtenidos
  const newEmployee = new employeeModel({ name, email, password, telephone, address, hireDate, salary, status });
  
  // Se guarda el nuevo empleado en la base de datos
  await newEmployee.save();
  
  // Se envía un mensaje de confirmación
  res.json({ message: "employee saved" });
};

// Función para eliminar un empleado por su ID
employeeController.deleteEmployee = async (req, res) => {
  // Se busca y elimina el empleado con el ID recibido en los parámetros de la solicitud
  await employeeModel.findByIdAndDelete(req.params.id);
  
  // Se envía un mensaje de confirmación
  res.json({ message: "employee deleted" });
};

// Función para actualizar los datos de un empleado
employeeController.updateEmployee = async (req, res) => {
  // Se extraen los datos enviados en el cuerpo de la solicitud
  const { name, email, password, telephone, address, hireDate, salary, status } = req.body;
  
  // Se busca el empleado por su ID y se actualizan sus datos
  const updateEmployee = await employeeModel.findByIdAndUpdate(
    req.params.id, 
    { name, email, password, telephone, address, hireDate, salary, status }, 
    { new: true } // Se configura para devolver el empleado actualizado
  );

  // Si el empleado no fue encontrado, se envía un mensaje de error
  if (!updateEmployee) {
    res.json({ message: "employee not found" });
  } else {
    // Si el empleado fue actualizado exitosamente, se envía un mensaje de confirmación
    res.json({ message: "employee updated" });
  }
};

// Se exporta el objeto del controlador para que pueda ser utilizado en otros archivos
export default employeeController;
