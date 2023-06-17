import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { errorLogger, logger } from "./shared/logger";

const port: number = 5000;

//database connection
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info("Database is connected successfully");

    app.listen(port, () => {
      logger.info(`Server is  listening on port ${port}`);
    });
  } catch (err) {
    errorLogger.error(`Failed to connect database`, err);
  }
}

main();
