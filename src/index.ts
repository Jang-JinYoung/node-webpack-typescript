// import express, { Express, Request, Response } from 'express';
// import connection from './database';

// const app: Express = express();
// const port = 3001;

// app.get('/', (req: Request, res: Response) => {
//   res.send('Typescript + Node.js + Express Server');
//   console.log(connection);
// });



// src/index.ts
import express from 'express';
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const port = 3001;


const schema = buildSchema(`
  type Query {
    hello: String
    persons : [Person]
  }
  
  type Person {
    name: String,
    age: Int
  }
`);

const root = {
  hello: () => "Hello World!",
  persons: () => [
    { name: "kim", age: 29 },
    { name: "seo", age: 31 },
    { name: "park", age: 32 },
  ],
};


const app = express();

// app.set(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/graphql", graphqlHTTP({ schema, rootValue: root, graphiql: true }));


app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});