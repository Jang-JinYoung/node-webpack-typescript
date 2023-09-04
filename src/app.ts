import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import compression from 'compression';

const app: Express = express();

app.use(morgan('dev'));
app.use(compression());


const port = 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Typescript + Node.js + Express Server');
});

app.listen(port, (): void => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});