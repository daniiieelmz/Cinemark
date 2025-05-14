// Importamos `Schema` y `model` de Mongoose para definir y utilizar esquemas en la base de datos MongoDB.
import { Schema, model } from "mongoose";

// Definimos un esquema para los empleados en la base de datos.
const employeeSchema = new Schema(
  {
    name: {
      type: String, // Tipo de dato: cadena de texto.
      require: true, // Campo obligatorio.
    },
    email: {
      type: String, // Tipo de dato: cadena de texto.
      require: true, // Campo obligatorio.
    },
    password: {
      type: String, // Tipo de dato: cadena de texto (debería ser almacenado encriptado).
      require: true, // Campo obligatorio.
    },
    telephone: {
      type: String, // Tipo de dato: cadena de texto.
      require: true, // Campo obligatorio.
    },
    address: {
      type: String, // Tipo de dato: cadena de texto.
      require: true, // Campo obligatorio.
    },
    chargue: {
      type: String, // Tipo de dato: cadena de texto, representa el cargo del empleado.
      require: true, // Campo obligatorio.
    },
    hireDate: {
      type: Date, // Tipo de dato: fecha, representa la fecha de contratación.
      require: true, // Campo obligatorio.
    },
    salary: {
      type: String, // Tipo de dato: cadena de texto (se recomienda usar `Number` para cálculos de salario).
      require: true, // Campo obligatorio.
    },
    status: {
      type: Boolean, // Tipo de dato: booleano (activo/inactivo).
      require: true, // Campo obligatorio.
    },
  },
  {
    timestamps: true, // Agrega automáticamente `createdAt` y `updatedAt` para registrar la fecha de creación y modificación del registro.
    strict: false, // Permite agregar campos adicionales que no están definidos en el esquema.
  }
);

// Exportamos el modelo `employee`, basado en el esquema `employeeSchema`, para poder utilizarlo en otras partes de la aplicación.
export default model("employee", employeeSchema);
