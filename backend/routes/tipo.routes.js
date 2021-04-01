import express from "express";
import Tipo from "../models/tipo";

const router = express.Router();

router.get("/tipos", async (req, res) => {
    try {
        const tipos = await Tipo.find()
        return res.json(tipos)
    } catch (err) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            err
        });
    }
})

router.post("/tipos", async (req, res) => {
    try {
        const tipo = await Tipo.create(req.body)
        return res.status(201).json(tipo)
    } catch (err) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error al agregar',
            err
        });
    }
})

router.get("/tipos/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const tipo = await Tipo.findOne({ _id })
        if (!tipo) {
            return res.status(404).json({
                mensaje: 'Este tipo no existe',
                err
            })
        }
        return res.status(200).json(tipo)
    } catch (err) {
        return res.status(404).json({
            mensaje: 'Ocurrio un error',
            err
        })
    }
});

router.put("/tipos/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const nota = await Tipo.findByIdAndUpdate(_id, req.body, { new: true, useFindAndModify: false });
        return res.status(200).json(nota);
    } catch (err) {
        return res.status(400).json({
            mensaje: 'Error al actualizar',
            err
        });
    }
});

router.delete("/tipos/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const tipo = await Tipo.findByIdAndDelete({ _id }, { useFindAndModify: false });
        return res.status(200).json(tipo)
    } catch (err) {
        return res.status(404).json({
            mensaje: 'El tipo no existe',
            err
        })
    }
})

module.exports = router;