import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

// class Board extends Model {
//   public id!: number;
//   public title!: string | null;
//   public writer!: string | null;
//   public country!: string | null;
//   public text!: string | null;
//   public writeDate!: Date | null;
// }

const Board = sequelize.define('Board', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  writer: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  text: {
    type: DataTypes.STRING(300),
    allowNull: true,
  },
  writeDate: {
    type: DataTypes.DATE,
    // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: true,
  },
}, {
  tableName: 'board', // 기존 테이블 이름 지정
  timestamps: false, // timestamps 자동 생성을 비활성화하려면 true로 설정
  charset: "utf8", // 한국어 설정
  collate: "utf8_general_ci", // 한국어 설정
});

console.log(Board === sequelize.models.Board); //

// Board.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     title: {
//       type: DataTypes.STRING(100),
//       allowNull: true,
//       get() {
//         console.log("A");
//       }
//     },
//     writer: {
//       type: DataTypes.STRING(100),
//       allowNull: true,
//     },
//     country: {
//       type: DataTypes.STRING(100),
//       allowNull: true,
//     },
//     text: {
//       type: DataTypes.STRING(300),
//       defaultValue: 'test',
//       allowNull: true,
//     },
//     writeDate: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.DATE,
//       allowNull: true,
//     },
//   },
//   {
//     sequelize,
//     tableName: 'board',
//     modelName: 'Board',
//     timestamps: false, // timestamps를 사용하지 않으려면 설정합니다.
//     // charset: 'utf8mb4', // 현재 사용 중인 캐릭터셋으로 설정
//     // collate: 'utf8mb4_general_ci',
//   }
// );

export { Board };
