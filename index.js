const express=require('express');
const app=express();
const PORT=8000;
const users=require('./mockData.json');
const fs=require('fs');
app.use(express.urlencoded({ extended: false }));



//Home path
app.get('/',(req,res)=>{
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
  return res.json(user)
})

//using post method

app.post('/api/users', (req, res) => {
  const body = req.body;
  users.push({...body, id: users.length+1});
  fs.writeFile('./mockData.json',JSON.stringify(users),(err,data)=>{
    return res.json({ status: 'send' }); // Assuming 'pending' is a string
  })
  //console.log("body", body); // Use a comma instead of concatenating directly
});

//using routing approach
app.route('/api/users')
.get((req,res)=>{
    return res.json(users);
})


.delete((req,res)=>{
  const delBody=req.body;
  users.pop();
  fs.writeFile('.mcokData.json',JSON.stringify(users),(err,data)=>{
    return res.send("updated or deleted")
  })

})


app.listen(PORT,()=>console.log(`server created at ${PORT}`));