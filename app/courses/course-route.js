import express  from "express";

import { getCourses } from "./course-repository.js";

const router = express.Router();

function asyncHandler(callback){

    return async (request,response,next)=>{

        try {
            
            await callback(request,response,next)

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}




router.get('/all',asyncHandler(async(request,response)=>{

    const courses = await getCourses();

    return response.json(courses)


}))


export default router;