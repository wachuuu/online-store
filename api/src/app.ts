import express, { Application, Request, Response } from 'express'

const app: Application = express()
const port: number = 3000

app.get('/', (_: Request, res: Response) => {
  res.send('App works!')
})

app.listen(port, () => {
  console.log(`App listening on port: ${port}`)
})
