import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import { Board } from './scheme/Board';
// import { Board } from './scheme/Board';
// import { User } from './database';

const app = express();

// 모든 원본(Origin)에 대한 CORS 허용
app.use(cors());

// 또는 특정 도메인에 대한 CORS 허용
// app.use(cors({
//   origin: 'https://example.com',
// }));

const BoardType = new GraphQLObjectType({
  name: 'Board',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    writer: { type: GraphQLString },
    country: { type: GraphQLString },
    text: { type: GraphQLString },
    writeDate: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // 다른 필드들...

    boards: {
      type: BoardType, // Board 모델에 대한 GraphQL 타입을 적절히 정의해야 합니다.
      resolve: async () => {
        try {
          // Board 모델에서 모든 데이터 검색
          const boards = await Board.findOne();
          console.log(boards);
          return boards;
        } catch (error) {
          throw error;
        }
      },
    },
  },
});


const schema = new GraphQLSchema({
  query: RootQuery,
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true, // 개발용 UI를 활성화합니다.
  })
);

app.get('/test', async (req, res) => {
  const board = await Board.findOne().then((boards) => {
    // console.log(boards);
    // res.send(boards)
    
  }).catch((err) => {
    console.error('데이터 조회 오류:', err);
  });
  

  res.send(board);
});


app.listen(4000, () => {
  console.log('GraphQL 서버가 4000번 포트에서 실행 중입니다.');
});
