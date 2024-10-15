const express = require("express");
const app = express();
const cors = require("cors");
const connection= require("./database/db");

app.use(express.json());
app.use(cors());


const authRouter = require("./routers/auth.router");

app.use("/api/auth", authRouter);

connection();

const port = process.env.PORT || 5000;
app.listen(port,()=>console.log("Uygulama http://localhost:5000 portundan ayağa kalktı!"));