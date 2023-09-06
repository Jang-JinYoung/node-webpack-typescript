import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

export const svcBoard = sequelize.define('SVC_BOARD', {
  BOARD_ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    comment: '게시글 일련번호',
  },
  BOARD_TITLE: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '게시글 제목',
  },
  BOARD_TEXT: {
    type: DataTypes.STRING(300),
    allowNull: false,
    comment: '게시글 내용',
  },
  USE_YN: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: '사용 유무',
  },
  DEL_YN: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: '삭제 유무',
  },
  BOARD_WRITE_DATE: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
    comment: '작성 일시',
  },
  BOARD_WRITER_USER_ID: {
    type: DataTypes.INTEGER,
    comment: '작성자 일련번호',
  },
  BOARD_CHANGE_DATE: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
    comment: '수정 일시',
  },
  BOARD_CHANGE_USER_ID: {
    type: DataTypes.INTEGER,
    comment: '수정자 일련번호',
  },
}, {
  // 다른 모델과의 관계, 테이블 이름, 기타 설정 등을 추가할 수 있습니다.
  tableName: 'SVC_BOARD', // 테이블 이름
  timestamps: false, // created_at 및 updated_at 컬럼 생성 여부
  // 다른 설정 옵션들...
});
