import sequelize from "./db.js";
import models from "../models/index.js";

export const initDatabase = async () => {
  try {
    console.log("Loaded models:", {
      User: !!models.User,
      BlogCategory: !!models.BlogCategory,
      Blogs: !!models.Blogs,
    });

    if (process.env.ALLOW_SYNC === "true") {
      console.log("Syncing database...");
      await sequelize.sync({
        force: true,
        alter: true,
      });
      console.log("Database synchronized");
    }
  } catch (error) {
    console.error("Failed to sync database:", error);
    throw error;
  }
};
