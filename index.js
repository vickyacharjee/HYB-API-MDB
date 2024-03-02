const express=require('express');
const app=express();
const PORT=8000;
const users=require('./mockData.json');
const fs=require('fs');
const { error } = require('console');

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

//Home path
app.get('/',(req,res)=>{
  // header for additional information
  res.setHeader("X-Name","vicky acharjee");//custon http header using setHeader()
  res.send("Hi this is home page");
})

//Dynamic html embeded 
app.get('/users',(req,res)=>{
  const html=`
  <ul>
  ${users.map((user)=>`<li>${user.first_name}</li> <hr> <li>${user.last_name}</li>`)}
  </ul>`;
  res.send(html);  
})


//dynamically with ID
app.get('/api/isers/:id',(req,res)=>{
  
  const id=Number(req.params.id);
  const user=users.find((user)=>user.id===id);
  if(!user){
     res.status(404).json({status:"user not found or out of scope"})//validation if it went out of scope since the current limit is 1000+
  }
  return res.json(user)
})


//using post method
app.post('/api/users', (req, res) => {
  const body = req.body;
  if(!body.first_name || !body.last_name || !body.email || !body.gender || !body.Work_Title){ //basic validation 400 indicates bad request  
    res.status(400).json({status:"Kindly fill the form completely"});
  }
  users.push({...body, id: users.length+1});
  fs.writeFile('./mockData.json',JSON.stringify(users),(err,data)=>{
    //adding custom http status code 201 saying created.
    return res.status(201).json({ status: 'send' }); // Assuming 'pending' is a string
  })
  //console.log("body", body); // Use a comma instead of concatenating directly
});



//using routing approach
app.route('/api/users')
.get((req,res)=>{
  res.setHeader("X-Name","vicky acharjee");//custon http header using setHeader
  return res.json(users);
})


// .delete((req,res)=>{
  //   const delBody=req.body;
  //   users.pop();
  //   fs.writeFile('.mcokData.json',JSON.stringify(users),(err,data)=>{
//     return res.send("updated or deleted")
//   })

// })


app.listen(PORT,()=>console.log(`server created at ${PORT}`));