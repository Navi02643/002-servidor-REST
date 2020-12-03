const { request } = require("express");
const express = require("express");
const _ = require("underscore");

const Productos = require("../models/productos");
const app = express();

// GET
app.get("/productos", (req, res) => {
  let desde = req.query.desde || 0;
  let hasta = req.query.hasta || 5;

  Productos.find({ disponibilidad: true })
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate("categoria", "descripcion")
    .populate("usuario", "nombre email")
    .exec((err, productos) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          msg: "Ocurrio un error al listar los productos",
          err,
        });
      }

      res.json({
        ok: true,
        msg: "Productos listados con exito",
        conteo: productos.length,
        productos,
      });
    });
});

// POST
app.post("/productos", (req, res) => {
  let prod = new Productos({
    nombre: req.body.nombre,
    preciounitario: req.body.preciounitario,
    categoria: req.body.categoria,
    disponible: req.body.disponible,
    usuario: req.body.usuario,
  });

  prod.save((err, prodDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        msg: "Ocurrio un error al insertar un producto",
      });
    }

    res.json({
      ok: true,
      mensaje: "Producto insertado con exito",
      prodDB,
    });
  });
});

//PUT
app.put("/productos/:id", function (req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, [
    "nombre",
    "preciounitario",
    "categoria",
    "disponible",
  ]);

  Productos.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true, context: "query" },
    (err, prodDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,

          msg: "Ocurrio un eeror al momento deactualizar",
        });
      }

      res.json({
        ok: true,
        msg: "Producto actualizado con exito",
        prodDB,
      });
    }
  );
});

//DELETE
app.delete("/productos/:id", function (req, res) {
  let id = req.params.id;

  Productos.findByIdAndUpdate(
    id,
    { disponible: false },
    { new: true, runValidators: true, context: "query" },
    (err, prodDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          msg: "Ocurrio un error al Eliminar",
          err,
        });
      }

      res.json({
        ok: true,
        msg: "Producto eliminado con exito",
        prodDB,
      });
    }
  );
});

module.exports = app;
