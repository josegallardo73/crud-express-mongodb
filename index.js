import mongoose from 'mongoose';
import express from 'express';

import { connect } from './conexion.js';
import { productosSchema } from './productos.js';
import  { mensajesSchema } from './mensajes.js';

const app = express();
const PORT = 9000;

app.use(express.json());

const Productos = mongoose.model('productos', productosSchema);
const Mensajes = mongoose.model('mensajes', mensajesSchema);

app.get('/productos', (req, res) => {
    Productos.find({})
        .then((productos) => res.send(productos))
        .catch(() => res.send({ error: 'No hay productos para mostrar'}));

});

app.get('/mensajes', (req, res) => {
    Mensajes.find({})
        .then((mensajes) => res.send(mensajes))
        .catch(() => res.send({ error: 'No hay mensajes para mostrar' }));
})

app.get('/productos/:id', (req, res) => {
    const id = req.params.id;
    Productos.findOne({ '_id' : id })
        .then((producto) => res.send(producto))
        .catch(() => res.send({ error: 'No existe un producto con ese id' }))
});

app.get('/mensajes/:id', (req, res) => {
    const id = req.params.id;
    Mensajes.findOne({'_id' : id})
        .then(mensaje => res.send(mensaje))
        .catch(() => res.send({ error: 'No existe un mensaje con ese id'}))
})

app.post('/productos', (req, res) => {
    const producto = new Productos(req.body);
    producto.save()
        .then(() => res.send({ success: 'Se ha creado el producto correctamente' }))
        .catch(() => res.send({ error: 'No se ha podido crear el producto correctamente' }))
});

app.post('/mensajes', (req, res) => {
    const mensaje = new Mensajes(req.body);
    mensaje.save()
        .then(() => res.send({ success: 'Se ha creado el mensaje correctamente'}))
        .catch(() => res.send({ error: 'No se ha podido crear el mensaje correctamente' }))
})

app.put('/productos/:id' , (req, res) => {
    const id = req.params.id;
    Productos.updateOne({'_id': id}, {$set: {'title': req.body.title, 'price': req.body.price, 'thumbnail': req.body.thumbnail}})
        .then(() => res.send({ success: 'Se ha actualizado el producto correctamente'}))
        .catch(() => res.send({ error: 'No se ha podido actualizar el producto correctamente'})) 
});

app.put('/mensajes/:id', (req, res) => {
    const id = req.params.id;
    Mensajes.updateOne({'_id' : id}, {$set: {'email': req.body.email, 'message': req.body.message}})
        .then(() => res.send({ success: 'Se ha actualizado el mensaje correctamente' }))
        .catch(() => res.send({ error: 'No se ha podido actualizar el mensaje correctamente'}))
});

app.delete('/productos/:id', (req, res) => {
    const id = req.params.id;
    Productos.deleteOne({ '_id': id })
        .then(() => res.send({ success: 'Se ha eliminado el producto correctamente'}))
        .catch(() => res.send({ error: 'No se ha podido eliminar el producto correctamente '}));
});

app.delete('/mensajes/:id', (req, res) => {
    const id = req.params.id;
    Mensajes.deleteOne({ '_id' : id})
        .then(() => res.send({ success: 'Se ha eliminado el mensaje correctamente'}))
        .catch(() => res.send({ error: 'No se ha podido eliminar el mensaje correctamente' }))
})


app.listen(PORT, () => {
    connect();
    console.log(`Running server on port ${PORT}`)
}).on('error', (err) => {
    throw new Error(err);
} )




