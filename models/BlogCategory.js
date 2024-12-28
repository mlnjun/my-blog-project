import { DataTypes } from "sequelize";

export default function defineBlogCategory(sequelize) {
  const BlogCategory = sequelize.define(
    "BlogCategory",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "blog_categories",
      timestamps: true,
      paranoid: false,
      indexes: [
        {
          unique: true,
          fields: ["name"],
        },
      ],
    }
  );

  BlogCategory.associate = (models) => {
    BlogCategory.hasMany(models.Blogs, {
      foreignKey: "category_id",
      as: "blogs",
    });
  };

  return BlogCategory;
}
