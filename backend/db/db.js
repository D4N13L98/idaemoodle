import { config as configureEnvVars } from "dotenv";
import mongoose from "mongoose";

configureEnvVars();
const password = process.env.MONGODB_PASSWORD;
const dbname = process.env.MONGODB_DATABASENAME;

const db = () => {
  mongoose
    .connect(
      `mongodb+srv://D4L13N:${password}@principal.yz9zxfu.mongodb.net/${dbname}`
    )
    .then(() => console.log("Conectado a MongoDB Atlas"))
    .catch((err) => console.log(err));
};

export default db;