import { Schema, model } from "mongoose";

const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
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

    activo: 
    { 
        type: Boolean, default: true 

    }
});

export default model("branches", branchesSchema);