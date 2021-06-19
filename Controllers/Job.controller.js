const { ObjectId } = require("bson");
const db = require("../mongoDB");
const cookieparser=require("cookie-parser");
function testInArray(i,j){
    var dem=0;
        for(const l of j){
            if(l.NameCompany===i){
                dem++;
            }
        }
    return dem;
}
async function userJobs(id){
    const userSkills=(await db.collection("User").findOne({_id:ObjectId(id)})).Skill;
        const Jobs=[]
        const listJob=await db.collection("Job").find({}).toArray()
        for (const i of userSkills){
            for(const j of listJob){
                if((j.Skills).indexOf(i)!==-1){
                    if(testInArray(j.NameCompany,Jobs)==0){
                        Jobs.push(j)
                    }   
            }
        }
    return Jobs;
}
}
module.exports={
    findingJob:async function(req,res,next){
        const Jobs=await userJobs(req.signedCookies.userId)
        res.render("Work/listJob",{
            Jobs:Jobs
        })
    },
    listJob:async function(req,res){
        var job;
        var coutJobIT;
        console.log(req.query.company)
        if(req.query.company!=undefined){
            job=await db.collection("Job").find({NameCompany:req.query.company}).toArray()
            coutJobIT=await db.collection("Job").find({NameCompany:req.query.company}).count()
         }
         else{
             job=await db.collection("Job").find({}).toArray()
             coutJobIT=await db.collection("Job").find({}).count()
         }
        res.render("Work/listJob",{
            Oustadingjob:await db.collection("Job").find({}).limit(2).toArray(),
            Jobs:job,   
            coutJobIT:coutJobIT+" Jobs IT"
        })
    },
    searchingJob:async function(req,res){
         var work=req.query.work
        // if(work==""){
        //     Jobs=await db.collection("Job").find({}).toArray()
        // }
        // else{
        //     Jobs=await db.collection("Job").find({Skills:work}).toArray()
        // }
        res.render("Work/lz",{
            Jobs:await db.collection("Job").find({Skills:work}).toArray()
        })
    },
    inforJob:async function(req,res,next){
         const Job=await db.collection("Job").findOne({_id:ObjectId(req.params.id)})
         const Jobs=await db.collection("Job").find({NameCompany:Job.NameCompany}).skip(1).toArray()
         const Company=await db.collection("Company").findOne({nameCompany:Job.NameCompany})
        //  const NameCompany=Job.NameCompany.toLowerCase()
        res.render("Work/inforJob",{ 
            Job:Job,
            Jobs:Jobs,  
            Company:Company,
            cookie:req.signedCookies.userId
        })
    },
    // companyInfor:async function(req,res,next){
    //     const Company=await db.collection("Company").findOne({nameCompany:req.params.id})
    //     const Jobs=await db.collection("Job").find({NameCompany:Company.nameCompany}).toArray()
    //     res.render("Work/inforCompany",{
    //         Company:Company,
    //         Jobs:Jobs
    //     })
    // }
}   