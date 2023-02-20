import express from "express";

import { getEnrollments , deleteEnrollment,addEnrollment,editEnrollments, getEnrollmentsById} from "./enrollment-repository.js";



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

router.get('/by-id/id=:id',asyncHandler(async(req,res,next)=>{


   
    let id = req.params.id;

    let enroll = await getEnrollmentsById(id);
    res.status(220).json(enroll);



}))


router.delete('/delete/id=:id',asyncHandler(async(req,res)=>{

    let id = req.params.id;

    await deleteEnrollment(id);

    return res.json(`Enrollment with ID:${id} deleted successfully`)

}))


router.post('/add',asyncHandler(async(request,response)=>{

    let enrollment = {
            student_id: request.body.student_id,
            course_id: request.body.course_id,
            created_at: request.body.created_at
        }
        await addEnrollment(enrollment);
        // json response, of a JSON parsed object 
        response.status(202).json(enrollment);
}))


router.put('/edit/id=:id',asyncHandler(async(request,response)=>{

    

    let id = request.params.id

    let enrollment = {
        student_id: request.body.student_id,
        course_id: request.body.course_id,
        created_at: request.body.created_at
    }

    await editEnrollments(enrollment, id)

    response.status(209).json(enrollment)




}))



export default router;