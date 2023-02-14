//sirve para confi la app express
import express from 'express'
import morgan from 'morgan'

import {createRoles} from './libs/setup'

import productRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'

const app = express()
createRoles();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json("Welcome")
})

app.use('/products', productRoutes)
app.use('/api/auth', authRoutes)

app.use('/api/users', userRoutes)

export default app;