import express from "express";
import Tarea from "../models/tarea";

const router = express.Router();

router.post("/tareas", async (req, res) => {
    try {
        let tarea = await Tarea.create(req.body)
        tarea = await tarea.populate("tipo").execPopulate()
        return res.json(tarea);
    } catch (err) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error al agregar',
            err
        });
    }
})
router.get("/tareas", async (req, res) => {
    try {
        const tareas = await Tarea.find().populate("tipo")
        return res.json(tareas)
    } catch (err) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            err
        });
    }
})

router.get("/tareas/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const tarea = await Tarea.findOne({ _id }).populate("tipo")
        return res.json(tarea)
    } catch (err) {

    }
})

router.put("/tareas/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        let tarea = await Tarea.findByIdAndUpdate(_id, req.body, { new: true, useFindAndModify: false });
        tarea = await tarea.populate("tipo").execPopulate()
        return res.status(200).json(tarea);
    } catch (err) {
        return res.status(400).json({
            mensaje: 'Error al actualizar',
            err
        });
    }
});

router.delete("/tareas/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const tarea = await Tarea.findByIdAndDelete({ _id }, { useFindAndModify: false });
        return res.status(200).json(tarea)
    } catch (err) {
        return res.status(404).json({
            mensaje: 'La tarea no existe',
            err
        })
    }
})

module.exports = router;