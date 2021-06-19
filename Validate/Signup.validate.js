const db=require("../mongoDB");
module.exports.postSignup=async function(req,res,next){
    var user=await db.collection("User").findOne({email:req.body.email})
    var userName=await db.collection("User").findOne({username:req.body.uname})
    if(req.body.email!=req.body.reemail){
        res.render("user/Signup",{
            error:"email and re-email are not the same",
            values:req.body,
        })
        return;
    }
    else if(user){
        res.render("user/Signup",{
            error:"Email already exists",
            values:req.body
        })
        return;
    }
    else if(userName){
        res.render("user/Signup",{
            error:"Username already exists",
            values:req.body
        })
        return;
    }
    else if(req.body.psw!=req.body.repsw){
        res.render("user/Signup",{
            error:"Password and Re-Password are not the same",
            values:req.body
        })
        return;
    }
    else if(req.body.skill ==undefined){
        res.render("user/Signup",{
            error:"You must enter skill",
            values:req.body
        })
        return;
    }
    next();
}