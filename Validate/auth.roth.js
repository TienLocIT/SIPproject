
const db = require("../mongoDB")
module.exports.postLogin=async function (req,res,next){
    var user=await db.collection("User").findOne({username:req.body.userName,password:req.body.password})
    if(!user){
        res.render("auth/login",{
            error:"Username or password is not true",
            values:req.body
        })
        return;
    }
    res.cookie("userId",user._id,{
        signed:true
    })
    next()
}