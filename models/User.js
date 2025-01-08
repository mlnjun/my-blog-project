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
      refreshToken: {
        type: DataTypes.STRING(512),
        allowNull: true,
        comment: "Refresh 토큰",
      },
      tokenExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "Refresh 토큰 만료일",
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
          fields: ["refreshToken"], // 토큰 검색 성능 향상
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
