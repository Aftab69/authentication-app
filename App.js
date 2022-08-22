const express = require("express");
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config({ path:"./config.env" });
require("./Connection");
app.use(require("./Routing"));
require("./Model");

//for heroku
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    })
}

app.listen(process.env.PORT || 5000,(req,res)=>{
    console.log(`app is running at ${process.env.PORT}`)
});