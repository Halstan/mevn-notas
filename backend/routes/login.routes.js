import express from 'express';
import bcrypt from "bcrypt";
import _ from "underscore"
import User from "../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/login', async (req, res) => {

    const body = req.body;

    try {
        const usuario = await User.findOne({ email: body.email });

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Credenciales invalidas"
            })
        }

        if (!bcrypt.compareSync(body.password, usuario.password)) {
            return res.status(404).json({
                mensaje: "Credenciales invalidas"
            })
        }

        // GENERAR TOKEN
        const token = jwt.sign({
            data: usuario
        }, 'secret', { expiresIn: 60 * 60 * 24 * 30 });

        return res.json({
            usuario,
            token
        })

    } catch (err) {
        return res.status(400).json({
            mensaje: "Ocurrio un error",
            err
        })
    }
})

module.exports = router