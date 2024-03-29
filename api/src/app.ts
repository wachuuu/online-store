import cors from 'cors';
import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ICartItem } from './models/cart-item.model';
import { createProduct, decrementProductQunatity, deleteProduct, getProducts, updateProduct } from './service/product.service';
const app: Application = express();

app.use(cors())
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI!);

app.get('/products', (_: Request, res: Response) => {
  getProducts().then((data) => {
    res.status(200).send(data);
  }, (err) => {
    res.status(400).send({ message: err.message });
  })
})

app.post('/products', (req: Request, res: Response) => {
  createProduct(req.body).then((data) => {
    res.status(200).send(data);
  }, (err) => {
    res.status(400).send({ message: err.message });
  })
})

app.put('/products/:id', (req: Request, res: Response) => {
  updateProduct({ _id: req.params.id, ...req.body }).then((data) => {
    res.status(200).send(data);
  }, (err) => {
    res.status(400).send({ message: err.message });
  })
})

app.delete('/products/:id', (req: Request, res: Response) => {
  deleteProduct(req.params.id).then((data) => {
    res.status(200).send(data);
  }, (err) => {
    res.status(400).send({ message: err.message });
  })
})

app.post('/products/buy/:id', (req: Request, res: Response) => {
  if (!req.body.quantity) {
    res.status(400).send({ message: 'Quantity of a product not provided' });
  } else {
    decrementProductQunatity(req.params.id, req.body.quantity).then((data) => {
      res.status(200).send(data);
    }, (err) => {
      res.status(400).send({ message: err.message });
    })
  }
})

app.post('/products/buy', (req: Request, res: Response) => {
  let promises: Promise<unknown>[] = []
  req.body.forEach((item: ICartItem) => {
    promises.push(decrementProductQunatity(item.product._id, item.quantity));
  });
  Promise.all(promises).then((values) => {
    res.status(200).send(values)
  }, (err) => {
    res.status(400).send(err);
  })
})

app.listen(process.env.PORT, () => {
  console.info(`App listening on port: ${process.env.PORT}`);
})
