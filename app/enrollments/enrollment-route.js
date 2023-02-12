import express from "express";

import { getEnrollments } from "./enrollment-repository.js";



const router = express.Router();

function asyncHandler(callback){

    return async (request, response, next)=>{

        try {
            await callback(request,response,next)
        } catch (error) {
            next(error)   
        }
    }
}


router.get('/all',asyncHandler(async(req,res)=>{

    const enrollments = await getEnrollments();

    return res.json(enrollments);

}))




export default router;