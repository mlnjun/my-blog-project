import { DataTypes } from "sequelize";

export default function defineBlogs(sequelize) {
  const Blogs = sequelize.define(
    "Blogs",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "blogs",
      timestamps: false,
      paranoid: false,
      indexes: [
        {
          name: "category_id_btree_idx",
          fields: ["category_id"],
        },
        {
          name: "title_category_btree_idx",
          fields: ["title", "category_id"],
        },
      ],
      comment: "블로그 게시글 테이블",
    }
  );

  Blogs.associate = function (models) {
    Blogs.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "author",
    });

    Blogs.belongsTo(models.BlogCategory, {
      foreignKey: "category_id",
      as: "category",
    });
  };

  return Blogs;
}
