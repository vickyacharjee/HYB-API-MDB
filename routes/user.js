const express = require('express');
const router = express.Router();

const {handleGetAllUsers,handleGetUsersNyId,handleUpdateUserById,handleDeleteUserById,handleCreateUser}=require('../controllers/user');


// router.get('/',(req,res)=>{
//   // header for additional information
//   res.setHeader("X-Name","vicky acharjee");//custon http header using setHeader()
//   res.send("Hi this is home page");
// })

router.get('/',handleGetAllUsers)
router.get('/:id',handleGetUsersNyId)

//using routing approach
router.route('/:id')
.patch(handleUpdateUserById)
.delete(handleDeleteUserById)

//using post method
router.post('/',handleCreateUser);




//Dynamic html embeded 
// router.get('/users',async(req,res)=>{
//   const allDBUser=await user.find({});
//   const html=`
//   <ul>
//   ${allDBUser.map((user)=>`<li>${user.firstName}</li> <hr> <li>${user.lastName}</li>`).join("")}
//   </ul>`;
//   res.send(html);  
// })


//dynamically with ID

  module.exports=router;