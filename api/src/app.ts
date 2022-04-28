import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import { createProduct, getProducts } from './service/product.service';

const app: Application = express()
app.use(express.json())
mongoose.connect(process.env.MONGODB_URI!)

app.get('/products', (_: Request, res: Response) => {
  getProducts().then((data) => {
    res.status(200).send(data)
  }, (err) => {
    res.status(400).send({message: err.message})
  })
})

app.post('/products', (req: Request, res: Response) => {
  createProduct(req.body).then((data)=> {
    res.status(200).send(data)
  }, (err) => {
    res.status(400).send({message: err.message})
  })
})

app.listen(process.env.PORT, () => {
  console.log(`App listening on port: ${process.env.PORT}`)
})
