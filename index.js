const express=require('express');
const app=express();
const PORT=8000;
const users=require('./mockData.json');



//Dynamic html embeded 
app.get('/users',(req,res)=>{
  const html=`
  <ul>
  ${users.map((user)=>`<li>${user.first_name}</li> <li>${user.last_name}</li>`)}
  </ul>`;
  res.send(html);  
})



//using routing approach
app.route('/api/users')

.get((req,res)=>{
    return res.json(users);
})




app.listen(PORT,()=>console.log(`server created at ${PORT}`));