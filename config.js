// config.js
const mongoose = require("mongoose");

const dbconnect = async () => {
    
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/users_prueba", {});
        console.log("Conexión exitosa a la base de datos");
    } catch (error) {
        console.error("Error de conexión:", error);
    }
};

module.exports = dbconnect;
