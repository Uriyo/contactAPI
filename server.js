const express=require('express');
//const userRoutes=require('./routes/userRoutes');
const {connectDb}=require('./config/dbConnection');
const dotenv=require("dotenv").config();//to access the values from env file
const errorHandler=require('./middleware/errorhandler');

connectDb();
const app=express();
const port = process.env.PORT ;
app.use(express.json());
app.use("/api/contacts",require('./routes/contactRoutes'));
app.use("/api/users",require('./routes/userRoutes'));
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server is running on the port ${port}`);
});

