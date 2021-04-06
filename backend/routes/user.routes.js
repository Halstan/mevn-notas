import express from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { verifyAuth, verifyAdmin } from "../middlewares/authentication";

const router = express.Router();

router.post("/user", async (req, res) => {

    const body = {
        nombre: req.body.nombre,
        email: req.body.email,
        role: req.body.role,
    }

    body.password = bcrypt.hashSync(req.body.password, 10)

    try {
        const user = await User.create(body)
        return res.status(201).json(user);
    } catch (err) {
        return res.status(500).json({
            mensaje: "Ocurrio un error al registrar",
            err
        })
    }
})

router.put("/user/:id", [verifyAuth, verifyAdmin], async (req, res) => {

    const _id = req.params.id;
    const body = _.pick(req.body, ['nombre', 'email', 'password', 'activo'])

    if (body.password) {
        body.password = bcrypt.hashSync(req.body.password, 10)

    }

    try {
        const user = await User.findByIdAndUpdate(_id, body, { new: true, useFindAndModify: false, runValidators: true })
        return res.status(201).json(user)
    } catch (err) {
        return res.status(400).json({
            mensaje: "Ocurrio un error",
            err
        })
    }
})

module.exports = router;