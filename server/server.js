require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('<h1>Bienvenido a mi servidor REST (localhost)</h1>');
});

app.get('/usuario', function(req, res) {
    res.json({
        ok: 200,
        mesaje: 'usuarios consultados con exito'
    });
});

app.post('/usuario', function(req, res) {
    let nombre = req.body.nombre;
    let body = req.body;

    if (nombre === undefined) {
        res.status(400).json({
            ok: 400,
            mensaje: 'favor de enviar el valor del nombre'
        });
    }

    res.json({
        ok: 200,
        mensaje: 'usuario insertado con exito',
        nombre: nombre,
        body: body
    });
});

app.put('/usuario/:id/:nombre', function(req, res) {
    let id = req.params.id;
    let nombre = req.params.nombre;

    res.json({
        ok: 200,
        mesaje: 'usuario actualizado con exito',
        id: id,
        nombre: nombre
    });
});

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;

    res.json({
        ok: 200,
        mensaje: 'usuario eliminado correctamente',
        id: id
    });
});

app.listen(process.env.PORT, () => {
    console.log('El servidor esta en linea por el puerto ', process.env.PORT);
});