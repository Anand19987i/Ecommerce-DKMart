import cookieParser from "cookie-parser";
import express from "express"
import dotenv from "dotenv"
import { createServer} from "http";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.route.js"
import productRoute from "./routes/product.route.js"
import orderRoute from "./routes/order.route.js"


dotenv.config({})

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

const corsOptions = {
    origin: "https://dkmart.onrender.com",
    // origin: "http://localhost:5173",
    credentials: true,
}

app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);

const port = process.env.PORT;
connectDB();
const server = createServer(app);

server.listen(port, () => {
    console.log(`Server is running ${port}`);
})