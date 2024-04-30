const { app } = require("./index");
const { connectDb } = require("./config/db");
require('dotenv').config();

// port 
const PORT = 5454 || process.env.PORT;
app.listen(PORT,async ()=>{
    await connectDb()
    console.log("ecommerce api listing on port ",PORT)
})