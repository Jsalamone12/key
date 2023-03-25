const express = require("express");
require('dotenv').config();
const app = express();
const port = 8000;
app.use(express.json(),express.urlencoded({extended:true}));
const cors = require("cors");
app.use(cors());

require("./config/mongoose.config");
require("./routes/shop.routes")(app);

app.listen(port,()=>console.log(`running on port ${port}!!!!!`));