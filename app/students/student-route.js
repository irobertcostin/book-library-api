import express from "express";

import { getStudents , deleteStudent,addStudent,editStudent } from "./student-repository.js";

const router = express.Router();


function asyncHandler(callback) {

    return async (req,res,next)=>{

        try {
                await callback(req,res,next);
        } catch (error) {
            next(error)
        }
    }
}


router.get('/all',asyncHandler(async(req,res)=>{

    const students = await getStudents();

    return res.json(students);


}))


router.delete('/delete/id=:id',asyncHandler(async(req,res)=>{

    let id = req.params.id;

    await deleteStudent(id);

    return res.json(`Student with ID:${id} deleted successfully`)


}))



router.post('/add',asyncHandler(async(request,response)=>{

    let student = {
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        age: request.body.age
    }

    await addStudent(student);

    response.status(201).json(student);

}))



router.put('/edit/id=:id',asyncHandler(async(request,response)=>{

    let id = request.params.id

        let student = {
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            email: request.body.email,
            age:request.body.age
        }

        await editStudent(student, id)

        response.status(210).json(student)



}))


export default router;