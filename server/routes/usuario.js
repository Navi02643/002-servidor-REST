const { request } = require("express");
const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const usuario = require("../models/usuario");
const Usuario = require("../models/usuario");
const app = express();

app.get("/usuario", function (req, res) {
  let desde = req.query.desde || 0;
  let hasta = req.query.hasta || 5;

  Usuario.find({ estado: true })
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          msg: "Ocurrio un error al momento de consultar",
          err,
        });
      }
      res.json({
        ok: true,
        msj: "Lista de usuarios obtenida con exito",
        conteo: usuarios.length,
        usuarios,
      });
    });
});

app.post("/usuario", function (req, res) {
  let body = req.body;
  let usr = new Usuario({
    nombre: body.nombre,
    apellido: body.apellido,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
  });

  usr.save((err, usrDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        msg: "Ocurrio un error",
        err,
      });
    }

    res.json({
      ok: true,
      msg: "Usuario isertado con exito",
      usrDB,
    });
  });
});

app.put("/usuario/:id", function (req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ["nombre", "apellido", "email"]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true, context: "query" },
    (err, usrDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          msg: "Ocurrio un error al momento de actualizar",
        });
      }

      res.json({
        ok: true,
        msg: "Usuario actualizado con exito",
        Usuario: usrDB,
      });
    }
  );
});

app.delete("/usuario/:id", function (req, res) {
  //let id = req.params.id;

  //Usuario.deleteOne({id: id},(err,usuarioBorrado)=>{
  //if(err){
  //return res.status(400).json({
  //ok: false,
  //msg: 'Ocurrio un error al momento de eliminar',
  //err
  //});
  //}
  //res.json({
  //ok:true,
  //msg: 'Usuario eliminado con exito',
  //usuarioBorrado
  //});
  //});

  let id = req.params.id;

  Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true, runValidators: true, context: "query" },
    (err, usrDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          msg: "ocurrio un error al momento de eliminar",
          err,
        });
      }
      res.json({
        ok: true,
        msg: "Usuario eliminado con exito",
        usrDB,
      });
    }
  );
});

module.exports = app;
