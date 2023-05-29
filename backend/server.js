import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import { usersRouter } from "./routers/user_router.js";
const app = express();
const port = 3000; // Choose the desired port number

// Middleware
const corsOptions = {
    origin:"http://localhost:4200",
    credentials:true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api/users", usersRouter);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const mongoURI = 'mongodb://localhost:27017/limeade'; // Replace with your MongoDB connection URI

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
