const mongoose = require ("mongoose");
const barSchema = mongoose.Schema({
    mesas: {
        type: Number,
    },
    sillas: {
        type: Number, 
    },
    horario: {
        type: String,
    },
    carta: {
        type: String,
    },
    bebidas: {
        type: String, 
    }
});

module.exports =mongoose.model("Bar", barSchema);