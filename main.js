const express=require("express");
const mongoose =require("mongoose");
const session=require("express-session");
require("dotenv").config();


const app=express();
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(session({
    secret:"my secret",
    saveUninitialized:true,
    resave:false
}))
app.use((req,res,next)=>{
    res.locals.message=req.session.message;
    delete req.session.message;
    next();
})
const PORT=process.env.PORT;
//set template en

app.set('view engine',"ejs")
app.use("",require('./routes/routes'));

//database connetion
mongoose.connect(process.env.DB_URI).then(()=>console.log("connection successful")).catch((e)=>console.log("error"))



app.listen(PORT,()=>{
    console.log(`server stared http://localhost:${PORT}`)
})