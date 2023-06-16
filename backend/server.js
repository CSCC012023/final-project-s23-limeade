import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import { usersRouter } from "./routers/user_router.js";
import { eventsRouter } from "./routers/event_router.js";
import dotenv from "dotenv"
import morgan from "morgan"
const app = express();
const port = 3000; // Choose the desired port number

app.use(session({
  secret: 'YourSecretKey',
  resave: false,
  saveUninitialized: true
}));

dotenv.config();
// Middleware
const corsOptions = {
    origin:process.env.FRONTEND,
    credentials:true
}
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api/users", usersRouter);
app.use("/api/events", eventsRouter);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const mongoURI = process.env.MONGO_URI; // Replace with your MongoDB connection URI

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Failed to connect to MongoDB:', err);
});
