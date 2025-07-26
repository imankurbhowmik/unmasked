import express from "express";
import cors from "cors";
import router from "./routes/authRoutes.js";
import { router as postRouter} from "./routes/postRoutes.js";
import { router as commentRouter } from "./routes/commentRoutes.js";
import { router as likeRouter } from "./routes/likeRoutes.js";
import { router as anotherUserRouter } from "./routes/anotherUserRoutes.js";


const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/auth", router);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);
app.use("/api/users", anotherUserRouter);


export default app;