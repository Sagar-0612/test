const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();


const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");


connectDB();


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use("/user", userRoutes);
app.use("/blog", blogRoutes);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan
      .white
  )}
)
