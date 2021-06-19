const { response } = require("express")
require("dotenv").config()
const express=require("express")
const app=express()
const userRoute = require('./routers/user.router')
const inforRoute = require('./routers/infor.router')

const cookieparser=require("cookie-parser")
const port=3000
const db=require("./mongoDB")
const auth=require("./Routers/auth.router")
const bodyParser=require("body-parser")
const { ObjectId } = require("bson")
const jobRouter=require("./Routers/Job.router")
app.use(express.static("public"))
app.set("view engine","pug")
app.set("views","./views")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieparser("a1se6321"))
app.get("/", async (req,res)=>{
    var a=await db.collection("Company").find({}).toArray();
    var cart=[];
    for(var i=0;i<a.length;i++){
        var nameCompany=a[i].nameCompany;
        var count=await db.collection("Job").find({NameCompany:nameCompany}).count();
        cart[nameCompany]=count;
    }
    let company1,company2,company3,max1=0,max2=0,max3=0
    for(var i=0;i<a.length;i++){
        var nameCompany=a[i].nameCompany;
        if(cart[nameCompany]>max1){
            max1=cart[nameCompany]
            company1=nameCompany
        }
    }
    for(var i=0;i<a.length;i++){
        var nameCompany=a[i].nameCompany;
        if(cart[nameCompany]<=max1 &&cart[nameCompany]>=max2 && nameCompany!=company1) {
            max2=cart[nameCompany]
            company2=nameCompany
        }
    }
    for(var i=0;i<a.length;i++){
        var nameCompany=a[i].nameCompany;
        if(cart[nameCompany]<=max2 &&cart[nameCompany]>max3 && nameCompany!=company2){
            max3=cart[nameCompany]
            company3=nameCompany
        }
    }
    var cookie=req.signedCookies.userId;
    res.render("index",{
         companyFirst:await db.collection("Company").findOne({nameCompany:company1}),
         companyTwo:await db.collection("Company").findOne({nameCompany:company2}),
         companyThree:await db.collection("Company").findOne({nameCompany:company3}),
         max1:max1+" Jobs IT",
         max2:max2+" Jobs IT",
         max3:max3+" Jobs IT",
         Job1:await db.collection("Job").find({}).limit(3).toArray(),
         Job2:await db.collection("Job").find({}).skip(3).limit(3).toArray(),
         Job3:await db.collection("Job").find({}).skip(6).limit(3).toArray(),
         Hotjob1:await db.collection("Job").find({}).limit(5).toArray(),
         Hotjob2:await db.collection("Job").find({}).skip(5).limit(5).toArray(),
         Latestjob1:await db.collection("Job").find({}).limit(4).toArray(),
         Latestjob2:await db.collection("Job").find({}).skip(4).limit(4).toArray(),
         Popularcompany:await db.collection("Company").find({}).limit(8).toArray(),
         cookie:cookie,
    })
})
app.use("/",auth)
app.use("/work",jobRouter)
app.use('/information', inforRoute);
app.use('/users', userRoute);
app.listen(port,()=>{
    console.log("App listening at:"+port)
})
    