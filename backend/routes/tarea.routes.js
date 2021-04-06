import express from "express";
import Tarea from "../models/tarea";
import { verifyAuth } from "../middlewares/authentication"

const router = express.Router();

router.post("/tareas", verifyAuth, async (req, res) => {

    let body = req.body;

    body.usuarioId = req.usuario._id

    try {
        let tarea = await Tarea.create(body)
        tarea = await tarea.populate("tipo").execPopulate()
        return res.json(tarea);
    } catch (err) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error al agregar',
            err
        });
    }
})
router.get("/tareas", verifyAuth, async (req, res) => {

    const usuarioId = req.usuario._id

    try {
        const tareas = await Tarea.find({ usuarioId }).populate("tipo")
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