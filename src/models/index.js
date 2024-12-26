import sequelize from "@/lib/db";
import defineUser from "./User";
import defineBlogCategory from "./BlogCategory";
import defineBlogs from "./Blogs";

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

export { User, BlogCategory, Blogs };
export default models;
