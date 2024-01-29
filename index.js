// const express= require('express');
// const PORT= 80;

// const app=express();
// const users=require('./MOCK_DATA.json');

// //GET
// //For Server Side Rendering
// app.get('/users',(req,res)=>{
//     // res.send('Hello From Home Page');
//     //return res.json(users);
//     const html=`
//     <ul>
//       ${users.map(users=>`
//       <li><h3>The user id is: <b> ${users.id}</b></h3></li> 
//       <li> ${users.first_name}</li>
//       <li> ${users.gender}</li>
//       <li> ${users.Work_Title}</li> <br>
//       `).join("")}
//     </ul>`;
//     res.send(html);
// })

// //For JSON API
// app.get('/api/users',(req,res)=>{
//     res.json(users);
// })

// //Lis the specific id Ex: 1,2,3 
// app.get('/api/users/:id',(req,res)=>{
//     const id=Number(req.params.id)
//     const user=users.find((user)=>user.id==id)
    
//     return res.send(user);
// })


// //POST
// app.post('/api/users',(req,res)=>{
//     return res.json({status:'pending'})
//     //pending 
// })

// //PATCH
// app.post('/api/users/:id',(req,res)=>{ //:id because patch will have seperate entity
//     return res.json({status:'pending'})
//     //pending 
// })


// //DELETE
// app.delete('/api/users/:id',(req,res)=>{ //:id because delete will have seperate entity
//     return res.json({status:'pending'})
//     //pending 
// })


// app.listen(PORT,()=>console.log(`Server started at ${PORT}`))


//                       Using Routing Approach only with same URL but with different HTTP Method

const express= require('express');
const PORT= 80;
const app=express();
const users=require('./MOCK_DATA.json');

//GET
//For Server Side Rendering
app.get('/users',(req,res)=>{
    // res.send('Hello From Home Page');
    //return res.json(users);
    const html=`
    <ul>
    ${users.map(users=>`
    <li><h3>The user id is: <b> ${users.id}</b></h3></li> 
    <li> ${users.first_name}</li>
    <li> ${users.gender}</li>
    <li> ${users.Work_Title}</li> <br>
    `).join("")}
    </ul>`;
    res.send(html);
})

//For JSON API
app.get('/api/users',(req,res)=>{
    res.json(users);
})


//using Routing approach
app.route('/api/users/:id')
//Lis the specific id Ex: 1,2,3 

.get((req,res)=>{
    const id=Number(req.params.id)
    const user=users.find((user)=>user.id==id)
    
    return res.send(user);
})
.put((req,res)=>{
    return res.json({status:'pending'})
    //pending for put
})
.delete((req,res)=>{ //:id because delete will have seperate entity
    return res.json({status:'pending'})
    //pending for delete
})


app.listen(PORT,()=>console.log(`Server started at ${PORT}`))


