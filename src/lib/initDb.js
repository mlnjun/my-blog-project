import sequelize from "./db";
import models from "@/models";

export async function initDatabase() {
  try {
    // 모델들이 실제로 import 되었는지 확인
    console.log("Loaded models:", {
      User: !!models.User,
      BlogCategory: !!models.BlogCategory,
      Blogs: !!models.Blogs,
    });

    // 연결
    if (process.env.ALLOW_SYNC === "true") {
      console.log("Syncing database...");
      await sequelize.sync({
        force: true, // 테이블 재생성
        alter: true,
      });
      console.log("Database synchronized");
    } else {
      console.log("ALLOW_SYNC is not true");
    }
  } catch (error) {
    console.error("Failed to sync database:", error);
    throw error;
  }
}
