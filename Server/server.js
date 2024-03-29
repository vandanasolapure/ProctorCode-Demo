const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const connectDb = require("./Dao/dbConnection");
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectDb();

//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/faculty", require("./Routes/facultyRoutes"));
app.use("/student", require("./Routes/studentRoutes"));

app.use("/course", require("./Routes/courseRoutes"));
app.use("/exam", require("./Routes/examRoutes"));
app.listen(3001);
