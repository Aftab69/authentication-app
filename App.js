const express = require("express");
const app = express();
const path = require("path");
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config({ path:"./config.env" });
require("./Connection");
app.use(require("./Routing"));
require("./Model");

// if( process.env.NODE_ENV == "production"){
//     app.use(express.static("client/build"));
//     const path = require("path");
//     app.get("*", (req,res)=>{
//         res.sendFile(path.resolve( __dirname, 'client', 'build', 'index.html'))
//     })
// }
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(process.env.PORT || 5000,(req,res)=>{
    console.log(`app is running at ${process.env.PORT}`)
});