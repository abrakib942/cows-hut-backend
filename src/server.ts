import mongoose from "mongoose";
import app from "./app";
import config from "./config";

const port: number = 5000;

//database connection
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database is connected successfully");
    app.listen(port, () => {
      console.log(`Server is  listening on port ${port}`);
    });
  } catch (err) {
    console.log(`Failed to connect database`, err);
  }
}

main();
