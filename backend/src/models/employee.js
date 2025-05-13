import { Schema, model } from "mongoose";

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
    {
    nombre: 
    { 
        type: String, required: true 
    },

    correo: 
    { 
        type: String, required: true, unique: true 
    },

    telefono: 
    { 
        type: String 
    },

    direccion: 
    { 
        type: String 
    },

    puesto: 
    { 
        type: String, required: true 
    },

    fecha_contratacion: 
    { 
        type: Date, required: true 
    },

    salario: 
    { 
        type: Number, required: true 
    },

    activo:
     { type: Boolean, default: true }
});


export default model("branches", branchesSchema);