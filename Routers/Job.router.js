const express=require("express")
const router=express.Router()
const controller=require("../Controllers/Job.controller")
router.get("/:id",controller.inforJob)
router.get("/",controller.listJob)
router.get("/userOwn",controller.findingJob)
router.get("/search/",controller.searchingJob)
// router.get("/company/:id",controller.companyInfor)
module.exports=router