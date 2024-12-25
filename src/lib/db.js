import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  dialectModule: require("mysql2"),
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: process.env.NODE_ENV === "development" ? console.log : false,
});

// DB 연결 확인
export async function checkConnection() {
  if (process.env.NODE_ENV === "production") {
    try {
      await sequelize.authenticate();
      console.log("프로덕션 DB 연결 성공");
    } catch (error) {
      console.error("DB 연결 실패:", error);
      throw error;
    }
  } else {
    console.log("개발 환경: DB 연결 확인 생략");
  }
}

export default sequelize;
