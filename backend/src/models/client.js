// Importamos las funciones `Schema` y `model` de Mongoose, que nos permiten definir y utilizar esquemas en MongoDB.
import { Schema, model } from "mongoose";

// Definimos un esquema llamado `clientSchema` para almacenar datos de clientes en la base de datos.
const clientSchema = new Schema(
  {
    name: {
      type: String, // Tipo de dato: cadena de texto.
      require: true, // Campo obligatorio.
      maxLength: 100, // Longitud máxima de 100 caracteres.
    },
    email: {
      type: String, // Tipo de dato: cadena de texto.
      require: true, // Campo obligatorio.
      maxLength: 100, // Longitud máxima de 100 caracteres.
    },
    password: {
      type: String, // Tipo de dato: cadena de texto (debería ser almacenado encriptado).
      require: true, // Campo obligatorio.
      maxLength: 100, // Longitud máxima de 100 caracteres.
    },
    telephone: {
      type: String, // Tipo de dato: cadena de texto.
      require: true, // Campo obligatorio.
    },
    address: {
      type: String, // Tipo de dato: cadena de texto.
      require: true, // Campo obligatorio.
    },
    status: {
      type: Boolean, // Tipo de dato: booleano (activo/inactivo).
      require: true, // Campo obligatorio.
    },
  },
  {
    timestamps: true, // Agrega automáticamente campos `createdAt` y `updatedAt` para controlar la fecha de creación y modificación del registro.
    strict: false, // Permite que se agreguen campos adicionales que no están definidos en el esquema.
  }
);

// Exportamos el modelo `client` basado en el esquema `clientSchema` para poder utilizarlo en otras partes de la aplicación.
export default model("client", clientSchema);
