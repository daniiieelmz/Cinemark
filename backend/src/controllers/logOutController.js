// Se define un objeto vacío para almacenar la función del controlador de cierre de sesión
const logOutController = {}; 

// Función para cerrar la sesión del usuario
logOutController.logOut = async (req, res) => {
  // Se elimina la cookie "authToken" que contiene el token de autenticación
  res.clearCookie("authToken");

  // Se envía una respuesta confirmando que la sesión se cerró correctamente
  return res.json({ message: "Session closed successfully" });
};

// Se exporta el controlador de cierre de sesión para que pueda ser utilizado en otros archivos
export default logOutController;
