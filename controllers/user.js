const user=require('../models/user');


async function handleGetAllUsers(req,res){
  const allDBUser=await user.find({});
  res.setHeader("X-Name","vicky acharjee");//custon http header using setHeader
  return res.json(allDBUser);
}

async function handleGetUsersNyId(req,res){
    const usee=await user.findById(req.params.id)
    if(!user){
        res.status(404).json({status:"user not found or out of scope"})//validation if it went out of scope since the current limit is 1000+
    }
    return res.json(usee)
}

async function handleUpdateUserById(req,res){
  await user.findByIdAndUpdate(req.params.id,{lastName:"Changed"})
  return res.json({msg:"updated"})
}

async function handleDeleteUserById(req,res){
    await user.findByIdAndDelete(req.params.id)
    return res.send("updated or deleted")
}

async function handleCreateUser(req,res){
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
}




module.exports={
    handleGetAllUsers,
    handleGetUsersNyId,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser
}