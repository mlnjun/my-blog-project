import sequelize from "../lib/db.js";
import defineUser from "./User.js";
import defineBlogCategory from "./BlogCategory.js";
import defineBlogs from "./Blogs.js";

// 모델 정의
const User = defineUser(sequelize);
const BlogCategory = defineBlogCategory(sequelize);
const Blogs = defineBlogs(sequelize);

// 모델들을 객체로 정의
const models = {
  User,
  BlogCategory,
  Blogs,
};

// 관계 설정 초기화
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { User, BlogCategory, Blogs, sequelize };
export default models;
