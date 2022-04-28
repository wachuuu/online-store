import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import { getProducts } from './service/product.service';

const app: Application = express()
mongoose.connect(process.env.MONGODB_URI!)

app.get('/', (_: Request, res: Response) => {
  getProducts().then((data) => {
    console.log(data)
    res.send(data)
  }, (error) => {
    console.error(error)
  })
})

app.listen(process.env.PORT, () => {
  console.log(`App listening on port: ${process.env.PORT}`)
})
