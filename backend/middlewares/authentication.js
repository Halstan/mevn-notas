import jwt from 'jsonwebtoken';

const verifyAuth = (req, res, next) => {

    const token = req.get('token')

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                mensaje: 'Usuario no valido',
                err
            })
        }
        req.usuario = decoded.data;

        next();
    })

}

const verifyAdmin = (req, res, next) => {
    const rol = req.usuario.role;

    if (rol === 'ADMIN') {
        next()
    } else {
        return res.status(401).json({
            mensaje: 'Usuario no valido'
        })
    }
}

module.exports = { verifyAuth, verifyAdmin }