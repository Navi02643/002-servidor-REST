const express = require("express");
const { Schema } = require("mongoose");
const _ = require("underscore");
const app = express();
const Categoria = require("../models/categoria");

app.get("/categoria", (req, res) => {
  let desde = req.query.desde || 0;
  let hasta = req.query.hasta || 5;

  Categoria.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate("usuario", "nombre email")
    .exec((err, categorias) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          msg: "Ocurrio un error al listar las categorias",
          err,
        });
      }

      res.json({
        ok: true,
        msg: "Categorias listadas con exito",
        conteo: categorias.length,
        categorias,
      });
    });
});

app.post("/categoria", (req, res) => {
  let cat = new Categoria({
    descripcion: req.body.descripcion,
    usuario: req.body.usuario,
  });

  cat.save((err, catDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        msg: "Ocurrio un error al insertar una categoria",
      });
    }

    res.json({
      ok: true,
      mensaje: "Categoria insertada con exito",
      catDB,
    });
  });
});

//PUT
app.put("/categoria/:id", function (req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ["descripcion"]);

  Categoria.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true, context: "query" },
    (err, catDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          msg: "Ocurrio un error al momento de actualizar",
        });
      }

      res.json({
        ok: true,
        msg: "Categoria actualizado con exito",
        Usuario: catDB,
      });
    }
  );
});

// DELETE
app.delete("/categoria/:id", function (req, res) {
  let id = req.params.id;

  Categoria.findByIdAndDelete({ _id: id }, (err, ctgborrada) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        msg: "Ocurrio un error al eliminar la categoria",
        err,
      });
    }

    res.json({
      ok: true,
      msg: "Categoria eliminada con exito",
      ctgborrada,
    });
  });
});

module.exports = app;
