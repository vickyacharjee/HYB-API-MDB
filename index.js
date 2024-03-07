const express=require('express');
const app=express();
const PORT=8000;
const fs=require('fs');
const mongoose=require('mongoose');
const { error, timeStamp } = require('console');

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
app.use((req,res,next)=>{
  fs.appendFile('logForMiddleWare.txt',`\n The method is:${req.method} The path is: ${req.path} Date is: ${Date.now().toLocaleString()}`,(err,data)=>{
    next();
  })
})

//connection for MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/youTubeApp')
.then(()=>console.log("MongoDB Connected:)"))
.catch((err)=>console.log("Mongo Error",err))


//Schema For MONGO
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
  },
  mail: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String
  },
  gender: {
    type: String,
    required: true
  }
},
{
  timestamps: true  // Corrected option name
});
//Model
const user=mongoose.model("user",userSchema);




//Home path
app.get('/',(req,res)=>{
  // header for additional information
  res.setHeader("X-Name","vicky acharjee");//custon http header using setHeader()
  res.send("Hi this is home page");
})



//Dynamic html embeded 
app.get('/users',async(req,res)=>{
  const allDBUser=await user.find({});
  const html=`
  <ul>
  ${allDBUser.map((user)=>`<li>${user.firstName}</li> <hr> <li>${user.lastName}</li>`).join("")}
  </ul>`;
  res.send(html);  
})


//dynamically with ID
app.get('/api/users/:id',async(req,res)=>{
  const usee=await user.findById(req.params.id)
  if(!user){
     res.status(404).json({status:"user not found or out of scope"})//validation if it went out of scope since the current limit is 1000+
  }
  return res.json(usee)
})


//using post method
app.post('/api/users', async (req, res) => {
  const body = req.body;
  if(!body.first_name || !body.last_name || !body.email || !body.gender || !body.Work_Title){ //basic validation 400 indicates bad request  
    res.status(400).json({status:"Kindly fill the form completely"});
  }
  const result=await user.create({
    firstName:body.first_name,
    lastName:body.last_name,
    mail:body.email,
    gender:body.gender,
    jobTitle:body.Work_Title
  })
  console.log(result); 
  return res.status(201).json({msg:"SUCCESS"})
});


app.get('/api/users',async (req,res)=>{
  const allDBUser=await user.find({});
  res.setHeader("X-Name","vicky acharjee");//custon http header using setHeader
  return res.json(allDBUser);
})

//using routing approach
app.route('/api/users/:id')

.patch(async (req,res)=>{
  await user.findByIdAndUpdate(req.params.id,{lastName:"Changed"})
  return res.json({masg:"updated"})
})

.delete(async (req,res)=>{
    await user.findByIdAndDelete(req.params.id)
    return res.send("updated or deleted")
  })

// })


app.listen(PORT,()=>console.log(`server created at ${PORT}`));