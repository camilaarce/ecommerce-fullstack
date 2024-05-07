import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import path from 'path';
import cors from 'cors';

require('dotenv').config();
// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
//import mercadopago from 'mercadopago';
import { log } from 'console';

const app = express();

/* mercadopago.configure({
    platform_id: process.env.PLATFORM_ID,
    integrator_id: process.env.INTEGRATOR_ID,
}); */

async function start() {
    const client = new MongoClient(`mongodb+srv://camilarce2710:${process.env.PASS}@cluster0.at3tbvn.mongodb.net/?retryWrites=true&w=majority`)

    await client.connect();
    const db = client.db('ecommerce-fullstack')

    app.use(express.json())

    app.use('/image', express.static(path.join(__dirname, '../assets')));

    app.use(cors())

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
        const id = new ObjectId(req.params.userId)
        const user = await db.collection('users').findOne({ _id: id })
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
        const id = new ObjectId(req.params.userId)
        await db.collection('users').updateOne({ _id: id }, {
            $addToSet: { cartItems: courseId }
        })
        const user = await db.collection('users').findOne({ _id: id })
        const populatedCart = await populateCartIds(user.cartItems)
        res.json(populatedCart)
    })

    app.delete('/users/:userId/cart/:courseId', async (req, res) => {
        const id = new ObjectId(req.params.userId)
        const courseId = req.params.courseId;
        await db.collection('users').updateOne({ _id: id }, {
            $pull: { cartItems: courseId }
        })
        const user = await db.collection('users').findOne({ _id: id })
        const populatedCart = await populateCartIds(user.cartItems)
        res.json(populatedCart)
    })

    app.post('/register', async (req, res) => {
        const bcrypt = require('bcrypt');
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            cartItems: []
        }
        await db.collection('users').insertOne(user);
        res.json(user)
    })

    const jwt = require('jsonwebtoken');

    app.post('/login', async (req, res) => {
        const bcrypt = require('bcrypt');
        try {
            const user = await db.collection('users').findOne({ email: req.body.email });

            if (!user) {
                throw new Error('Incorrect email');
            }

            const match = await bcrypt.compare(req.body.password, user.password);

            if (!match) {
                throw new Error('Incorrect password');
            }

            const token = jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' });

            res.json({ token, 'id': user._id });
        } catch (error) {
            res.status(401).send({ 'error': error.message });
        }

    });

    app.post('/create_preference', async (req, res) => {
        try {
            const clientMP = new MercadoPagoConfig({ accessToken: 'TEST-2024853291389327-050208-ca9a70192705738a516682c5894b593b-188505513', options: { timeout: 5000 } });
            const preference = new Preference(clientMP);

            preference.create({
                body: {
                    items: [
                        {
                            title: 'Cursos',
                            unit_price: 10000,
                            quantity: 1
                        }
                    ],
                    "back_urls": {
                        "success": "https://ecommerce-fullstack-camilaarce.netlify.app/success",
                        "failure": "https://ecommerce-fullstack-camilaarce.netlify.app/failure",
                        "pending": "https://ecommerce-fullstack-camilaarce.netlify.app/pending"
                    },
                    "auto_return": "approved",
                }
            })
                .then(console.log)
                .catch(console.log);
        } catch (error) {
            console.error('Error al crear la preferencia:', error);
            res.status(500).json({ error: 'Error al crear la preferencia' });
        }
    });



    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    })
}

module.exports = app;
start();
