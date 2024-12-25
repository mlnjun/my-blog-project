import sequelize from "./db";
import User from "@/models/User";

export async function initDatabase() {
  try {
    // 모든 모델 동기화
    if (process.env.ALLOW_SYNC === "true") {
      await sequelize.sync({ alter: true });
      console.log("Database synchronized");
    }
  } catch (error) {
    console.error("Failed to sync database:", error);
    throw error;
  }
}
