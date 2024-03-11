const express=require('express')

const app=express();
const PORT=8000;
const { error, timeStamp } = require('console');
const {loReqRes} =require('./middlewares');
const userRouter=require('./routes/user');
const {connectMongoDb}=require('./connection');

connectMongoDb('mongodb://127.0.0.1:27017/youTubeApp').then(()=>console.log("MongoDB connected"));

//MiddleWare plugins for PostMan 
app.use(express.urlencoded({ extended: false }));



//MiddleWae 1
app.use((req,res,next)=>{
  req.userName="vickyAcharjee"
  console.log("hello from middle ware 1",req.userName) //req.userName is mainly used for refrenced to all the functions accrosed.
  next();  //Authorize to remaining
});

//MiddelWare 2
app.use((req,res,next)=>{
  console.log("Hello from middleAWare 2");
  next();//Authorize to remaining
})

//Middleware 3
//for pathName, http method,Dat() 
app.use(loReqRes('logForMiddleWare.txt'));


//Schema For MONGO
//Home path
// })

app.use('/api/user',userRouter);
app.listen(PORT,()=>console.log(`server created at ${PORT}`));





