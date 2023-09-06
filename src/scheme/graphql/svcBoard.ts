import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLNonNull,
} from 'graphql';

// SVC_BOARD 테이블을 기반으로한 GraphQL Object Type 정의
export const BoardType = new GraphQLObjectType({
    name: 'Board',
    description: '게시판 게시글',
    fields: () => ({
        boardId: { type: new GraphQLNonNull(GraphQLInt) },
        boardTitle: { type: new GraphQLNonNull(GraphQLString) },
        boardText: { type: new GraphQLNonNull(GraphQLString) },
        useYn: { type: new GraphQLNonNull(GraphQLBoolean) },
        delYn: { type: new GraphQLNonNull(GraphQLBoolean) },
        boardWriteDate: { type: new GraphQLNonNull(GraphQLString) },
        boardWriteUserId: { type: GraphQLInt },
        boardChangeDate: { type: new GraphQLNonNull(GraphQLString) },
        boardChangeUserId: { type: GraphQLInt },
    }),
});