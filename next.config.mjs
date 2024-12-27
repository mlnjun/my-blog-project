import { initDatabase } from "./lib/initDb.js";

console.log("Starting database initialization...");

(async () => {
  if (process.env.ALLOW_SYNC === "true") {
    try {
      console.log("Initializing database...");
      await initDatabase();
      console.log("Database initialization complete");
    } catch (error) {
      console.error("Database initialization failed:", error);
    }
  }
})();

/** @type {import('next').NextConfig} */

const nextConfig = { reactStrictMode: false };

export default nextConfig;
