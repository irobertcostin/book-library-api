import express  from "express";

import { getCourses ,deleteCourse ,addCourse,editCourse} from "./course-repository.js";

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

router.delete('/delete/id=:id',asyncHandler(async(req,res)=>{

    let id = req.params.id;

    await deleteCourse(id);

    return res.json(`Course with ID:${id} deleted successfully`)


}))



router.post('/add',asyncHandler(async(req,res)=>{

    let course = {
        name: req.body.name,
        department: req.body.department
    }

    await addCourse(course);

    res.status(203).json(course)



}))


router.put('/edit/id=:id',asyncHandler(async(request,response)=>{

    let id = request.params.id

    let course = {
        name: request.body.name,
        department: request.body.department
    }

    await editCourse(course, id)

    response.status(208).json(course)

}))




export default router;