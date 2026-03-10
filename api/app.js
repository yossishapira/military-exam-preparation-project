import "dotenv/config";
import express from "express";
import cors from "cors";
import { connect } from "./db.js";
import notFound from "./middleware/notFound.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import errorHandler from "./middleware/errorHandler.js";
import { createUser } from "./services/userService.js"; 
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use(notFound);
app.use(errorHandler);



connect()
  .then(async () => {
    console.log("Connected to MongoDB");

    const firstUser = {
      agentCode: "yossi",
      fullName: "yossi shapira",
      role: "admin",
      password: "123456",
    };

    try {
      await createUser(
        firstUser.agentCode,
        firstUser.fullName,
        firstUser.role,
        firstUser.password
      );
      console.log("Admin user checked/created successfully");
    } catch (err) {
      console.log("Note: Admin user might already exist or failed to create");
    }

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Critical error during startup:", err);
    process.exit(1);
  });

















// connect()
// .then(() => {
// const firstUser = {
//   agentCode: "yossi",
//   fullName: "yossi shapira",
//   role: "admin",
//   password: "123456",
// };

//    createUser(
//     firstUser.agentCode,
//     firstUser.fullName,
//     firstUser.role,
//     firstUser.password,
//   );
//   console.log("user created");
  
// });
// .catch((err) => {
//   console.log("First user already Exists",err);
// })

//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server listening on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection failed:", err);
//     process.exit(1);
//   });
