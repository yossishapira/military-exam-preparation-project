import "dotenv/config";
import express from "express";
import cors from "cors";
import { connect } from "./db.js";
import routes from "./routes/index.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import { createUser } from "./services/authService.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

const firstUser = {
  agentCode: "yossi",
  fullName: "yossi shapira",
  role: "admin"
};

try {
    
await createUser(firstUser.agentCode, firstUser.fullName, firstUser.role);

} catch {
 console.log("First user already Exists")
}


connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
