import { DataTypes } from "sequelize";

export default function defineUser(sequelize) {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "사용자 고유 ID",
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "사용자 로그인 ID",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "암호화된 비밀번호",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "사용자 이름",
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "관리자 여부",
      },
      tokenVersion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "토큰 버전",
      },
    },
    {
      tableName: "users",
      timestamps: true, // createdAt, updatedAt 자동 생성
      indexes: [
        {
          unique: true,
          fields: ["userId"],
        },
        {
          fields: ["tokenVersion"], // 토큰 검색 성능 향상
        },
      ],
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Blogs, {
      foreignKey: "user_id",
      as: "blogs",
    });
  };

  return User;
}
