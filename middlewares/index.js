const fs=require('fs');


function loReqRes(fileName){
    return (req,res,next)=>{
    fs.appendFile(fileName,`\n The method is:${req.method} The path is: ${req.path} Date is: ${Date.now().toLocaleString()}`,(err,data)=>{
    next();
  })
}
}

module.exports={
    loReqRes,
}