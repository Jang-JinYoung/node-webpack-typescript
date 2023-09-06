import { Sequelize, DataTypes } from 'sequelize';

const connection = {
    host: '.cafe24.com',
    user: '',
    password: '!',
    port: 3306,
    database: ''
};


export const sequelize = new Sequelize(connection.database, connection.user, connection.password, {
    host: connection.host,
    dialect: 'mysql',
    dialectOptions: {
        multipleStatements: true,
        typeCast: (field: any, next: any) => {
            if (field.type == 'VAR_STRING' && field.db === 'jinyoung4892') {
                // console.log(field)
                return field.buffer().toString('utf-8');
            }
            return next();
        },
    }
});

// 모델 동기화 및 데이터베이스 연결
(async () => {
    try {
        await sequelize.sync();
        console.log('데이터베이스 연결 성공!');
    } catch (error) {
        console.error('데이터베이스 연결 오류:', error);
    }
})();
