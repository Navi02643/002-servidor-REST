const bodyParser = require("body-parser");
const express = require("express");
const usuario = require("../models/usuario");
const Usuario = require("../models/usuario");
const app = express();

app.get("/usuario", function (req, res) {
  res.json({
    ok: 200,
    mesaje: "usuarios consultados con exito",
  });
});

app.post("/usuario", function (req, res) {
  let body = req.body;
  let usr = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: body.password,
  });

  usr.save((err, usrDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        msg: 'Ocurrio un error',
        err
      });
    }
    
    res.json({
      ok: true,
      msg: "Usuario isertado con exito",
      usrDB
    });
  });
});

app.put("/usuario/:id/:nombre", function (req, res) {
  let id = req.params.id;
  let nombre = req.params.nombre;

  res.json({
    ok: 200,
    mesaje: "usuario actualizado con exito",
    id: id,
    nombre: nombre,
  });
});

app.delete("/usuario/:id", function (req, res) {
  let id = req.params.id;

  res.json({
    ok: 200,
    mensaje: "usuario eliminado correctamente",
    id: id,
  });
});

module.exports = app;
