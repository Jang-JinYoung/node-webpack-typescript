import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLBoolean } from 'graphql';
import { BoardType } from './scheme/graphql/svcBoard';
import { svcBoard } from './scheme/sequelize/svcBoard';

const app = express();

// 모든 원본(Origin)에 대한 CORS 허용
app.use(cors());
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // 다른 필드들...

    boards: {
      type: BoardType, // Board 모델에 대한 GraphQL 타입을 적절히 정의해야 합니다.
      resolve: async () => {
        try {
          // Board 모델에서 모든 데이터 검색
          const boards = await svcBoard.findOne();
          return boards;
        } catch (error) {
          throw error;
        }
      },
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createBoard: {
      type: BoardType, // 생성된 게시글의 타입
      args: {
        boardId: { type: GraphQLInt },
        boardTitle: { type: new GraphQLNonNull(GraphQLString) },
        boardText: { type: new GraphQLNonNull(GraphQLString) },
        useYn: { type: new GraphQLNonNull(GraphQLBoolean) },
        delYn: { type: new GraphQLNonNull(GraphQLBoolean) },
        boardWriteDate: { type: new GraphQLNonNull(GraphQLString) },
        boardWriteUserId: { type: GraphQLInt },
        boardChangeDate: { type: new GraphQLNonNull(GraphQLString) },
        boardChangeUserId: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        try {
          // 게시글 데이터를 생성합니다.
          const newBoard = await svcBoard.create({
            BOARD_TITLE: args.boardTitle,
            BOARD_TEXT: args.boardText,
            USE_YN: args.useYn,
            DEL_YN: args.delYn,
            BOARD_WRITE_DATE: args.boardWriteDate,
            BOARD_WRITER_USER_ID: args.boardWriteUserId,
            BOARD_CHANGE_DATE: args.boardChangeDate,
            BOARD_CHANGE_USER_ID: args.boardChangeUserId,
          });

          return newBoard;
        } catch (error) {
          // 삽입 실패 시 에러를 처리하세요.
          console.error('게시글 삽입 실패:', error);
          throw error;
        }
      },
    },
  },
});

// 나머지 부분은 스키마와 타입 정의와 관련된 코드입니다.

// GraphQL 스키마 생성
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: MutationType, // Mutation 타입 추가
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true, // 개발용 UI를 활성화합니다.
  })
);



app.listen(4000, () => {
  console.log('GraphQL 서버가 4000번 포트에서 실행 중입니다.');
});
