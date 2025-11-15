import express from "express";

import { PORT } from "./config/env.js";

import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import authRouter from "./routes/auth.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";


const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// Rate limit, bot protection
app.use(arcjetMiddleware);

//route
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/workflows", workflowRouter);

// error middleware
app.use(errorMiddleware);


app.listen(PORT, async ()=>{
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);

    await connectToDatabase();
});

export default app;