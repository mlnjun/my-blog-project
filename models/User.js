import { DataTypes } from "sequelize";

export default function defineUser(sequelize) {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "users",
      timestamps: true,

      indexes: [
        {
          unique: true,
          fields: ["name"],
        },
        {
          unique: true,
          fields: ["userId"],
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
