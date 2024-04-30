const express = require("express");
const barSchema = require("./bar");
const dbconnect = require("./config");





const app = express();
const router = express.Router();


const port = 3002; 
app.listen(port, () => {
    console.log(`El servidor se está ejecutando en el puerto ${port}`);
});


app.use(express.json());
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});



router.post("/", async (req, res) => {
    try {
        const body = {
                "mesas": "6",
                "sillas": "24",
                "horario": "20hs",
                "carta": "Pizza",
                "bebidas": "SevenUp"
            }
            
        const newUser = await barSchema.create(body);
        res.json(newUser);

        
    } catch (error) {
        console.log(error)
    }
});


router.get("/", async (req, res, next) => {
    try {

        const id = req.params.id;
        const user = await barSchema.find();
        if (!user) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
});


router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id; // Obtener el ID de la URL
        const user = await barSchema.findById(id); // Buscar el usuario por ID
        
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(user); // Devolver el usuario encontrado
    } catch (error) {
        next(error);
    }
});


// Actualizar datos de usuario por ID
router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { mesas, sillas, horario, cartas, bebidas } = req.body;
        const updatedUser = await barSchema.findByIdAndUpdate(id, { mesas, sillas, horario, cartas, bebidas }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
});

// Borrar usuario por ID
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUser = await barSchema.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json({ mensaje: "Usuario eliminado exitosamente" });
    } catch (error) {
        next(error);
    }
});



app.use("/api/bar", router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`El servidor está en ejecución en el puerto ${PORT}`);
});

module.exports = router;


dbconnect();
