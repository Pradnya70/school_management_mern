require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//Routers import
const schoolRouter = require("./routers/school.router");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoose connection
mongoose
  .connect("mongodb://localhost:27017/schoolManagement2024")
  .then((db) => {
    console.log("connected to database");
  })
  .catch((e) => {
    console.log("MongoDb error", e);
  });

//Routers
app.use("/api/school", schoolRouter);
// app.use("/api/school", schoolRouter);
// app.use("/api/school", schoolRouter);
// app.use("/api/school", schoolRouter);
// app.use("/api/school", schoolRouter);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running at PORT=>", PORT);
});

// url type in browser -> localhots:port/api/school/register
//localhots:port/api/school/all
//localhots:port/api/school/login
//localhots:port/api/school/update
//localhots:port/api/school/fetch-single

// const PORT = process.env.PORT;
// app.use(express.json());
// app.use(express.urlencoded({extended:true}))
// app.listen(PORT, () => {
//   console.log("Server is running at PORT=>", PORT);
// });
