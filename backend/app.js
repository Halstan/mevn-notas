import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import history from 'connect-history-api-fallback';
import mongoose from 'mongoose';

const app = express();

const uri = "mongodb://localhost:27017/tareas"

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(uri, options).then(
    () => {
        console.log('Conectado a mongoDB');
    },
    err => {
        err
    }
)

app.use(morgan('dev'))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//app.use(history());
//app.use(express.static(path.join(__dirname, '/public')))

/*app.get("/", function (req, res) {
    res.render(path.join(__dirname + '/dist/index.html'));
});*/

app.use("/api", require("./routes/tipo.routes"), require("./routes/tarea.routes"));

app.set('puerto', process.env.PORT || 7000)

app.listen(app.get('puerto'), function () {
    console.log(`Escuchando el puerto ${app.get('puerto')}`);
})