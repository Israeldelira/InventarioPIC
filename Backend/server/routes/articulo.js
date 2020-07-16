const express = require('express');
const _ = require('underscore');
const Articulo = require('../models/articulo');
const app = express();

app.get('/articulo', async(req, res) => {
    const articulo = await Articulo.find();
    res.render('articulos', { articulo })
        // Articulo.find({ disponible: true })
        //     .exec((err, articulos) => {
        //         if (err) {
        //             return res.status(400).json({
        //                 ok: false,
        //                 err
        //             });
        //         }
        //         return res.status(200).json({
        //             ok: true,
        //             count: articulos.length,
        //             articulos
        //         })
        // });
});

app.post('/articulo', async(req, res) => {
    let body = req.body;

    let articulo = new Articulo({
        nombre: body.nombre,
        modelo: body.modelo,
        categoria: body.categoria,
        cantidad: body.cantidad,
        descripcion: body.descripcion,
        img: body.img
    });
    await articulo.save((err, articuloDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            articuloDB
        });
    });
});

app.put('/articulo/', (req, res) => {
    let id = req.body.id;
    let body = _.pick(req.body, ['nombre', 'modelo', 'categoria', 'cantidad', 'descripcion', 'disponible']);

    Articulo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, articuloDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        return res.status(200).json({
            ok: true,
            articuloDB
        });
    });
});

app.delete('/articulo', (req, res) => {
    let id = req.body.id;
    Articulo.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});
module.exports = app;