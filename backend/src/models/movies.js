import { Schema, model } from "mongoose";

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    titulo: 
    { 
        type: String, required: true 
    },

    descripcion: 
    { 
        type: String 
    },
    director:
     {
         type: String 
        },

    genero: 
    { type: 
        [String], required: true 
    },

    anio: 
    { 
        type: Number, required: true 
    },

    duracion: 
    { 
        type: Number 
    },

    imagen:
     { 
        type: String 
    } // URL de la imagen de la película
});

export default model("branches", branchesSchema);