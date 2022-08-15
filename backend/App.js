const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path:"./config.env" });
require("./Connection");
app.use(require("./Routing"));

app.listen(5000,(req,res)=>{
    console.log("app is running at port 5000")
});