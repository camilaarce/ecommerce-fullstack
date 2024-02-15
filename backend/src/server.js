import express from 'express';
import { MongoClient } from 'mongodb';
import path from 'path';

require('dotenv').config();
async function start() {
    const client = new MongoClient(`mongodb+srv://camilarce2710:${process.env.PASS}@cluster0.at3tbvn.mongodb.net/?retryWrites=true&w=majority`)

    await client.connect();
    const db = client.db('ecommerce-fullstack')

    const app = express();
    app.use(express.json())

    app.use('/image', express.static(path.join(__dirname, '../assets')));

    /* app.get('/images/:imageName', (req, res) => {
        const imageName = req.params.imageName;
        const imagePath = path.join(__dirname, '../assets', imageName);

        // Verifica si el archivo de imagen existe
        fs.exists(imagePath, (exists) => {
            if (exists) {
                // Si existe, envía el archivo como respuesta
                res.sendFile(imagePath);
            } else {
                // Si no existe, envía un error 404
                res.status(404).send('Imagen no encontrada');
            }
        });
    }); */

    app.get('/courses', async (req, res) => {
        const courses = await db.collection('courses').find({}).toArray();
        res.json(courses)
    })

    async function populateCartIds(ids) {
        return Promise.all(ids.map(id => db.collection('courses').findOne({ id })))
    }

    app.get('/users/:userId/cart', async (req, res) => {
        const user = await db.collection('users').findOne({ id: req.params.userId })
        const populatedCart = await populateCartIds(user.cartItems)
        res.json(populatedCart)
    })

    app.get('/courses/:courseId', async (req, res) => {
        const courseId = req.params.courseId;
        const course = await db.collection('courses').findOne({ id: courseId })
        res.json(course)
    })

    app.post('/users/:userId/cart', async (req, res) => {
        const courseId = req.body.id;
        await db.collection('users').updateOne({ id: req.params.userId }, {
            $addToSet: { cartItems: courseId }
        })
        const user = await db.collection('users').findOne({ id: req.params.userId })
        const populatedCart = await populateCartIds(user.cartItems)
        res.json(populatedCart)
    })

    app.delete('/users/:userId/cart/:courseId', async (req, res) => {
        const courseId = req.params.courseId;
        await db.collection('users').updateOne({ id: req.params.userId }, {
            $pull: { cartItems: courseId }
        })
        const user = await db.collection('users').findOne({ id: req.params.userId })
        const populatedCart = await populateCartIds(user.cartItems)
        res.json(populatedCart)
    })

    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    })
}

start();