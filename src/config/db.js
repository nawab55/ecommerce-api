const mongoose = require("mongoose");
require('dotenv').config();

const mongoDbUrl=process.env.DATABASE;
const connectDb=()=>{
    return mongoose.connect(mongoDbUrl)
}

module.exports={connectDb}

