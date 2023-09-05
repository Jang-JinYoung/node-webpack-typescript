import { Sequelize, DataTypes } from 'sequelize';
// import  from 'mariadb';

const connection = {
    host: '',
    user: '',
    password: '',
    port: 3306,
    database: ''
};


export const sequelize = new Sequelize(connection.database, connection.user, connection.password, {
    host: connection.host,
    dialect: 'mysql',
    //   dialectModule: require('mysql2'),
    dialectOptions: {
        multipleStatements: true,
        typeCast:  (field: any, next: any) => {
            if (field.type == 'VAR_STRING') {
                console.log(field)
                return field.string();
            }
            return next();
        },
        charset: 'utf8mb4'
    }
});

// console.log(sequelize)

// 모델 동기화 및 데이터베이스 연결
(async () => {
    try {
        await sequelize.sync();
        console.log('데이터베이스 연결 성공!');
    } catch (error) {
        console.error('데이터베이스 연결 오류:', error);
    }
})();