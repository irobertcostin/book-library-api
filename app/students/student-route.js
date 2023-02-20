import express from "express";

import { getStudents , deleteStudent,addStudent,editStudent, getStudentsById, loginCheck } from "./student-repository.js";

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


router.get('/by-ID/id=:id',asyncHandler(async(req,res)=>{

    let id = req.params.id;

    let student=await getStudentsById(id);

    res.status(211).json(student)


}))


router.post('/login',asyncHandler(async(req,res)=>{

    // POST for credentials hide

    let studentToCheck = {
        email:req.body.email,
        password:req.body.password
    }

    let checkStudent = await loginCheck(studentToCheck)

    return res.status(212).json("Successfully logged in");


}))


router.delete('/delete/id=:id',asyncHandler(async(req,res)=>{

    let id = req.params.id;

    await deleteStudent(id);

    return res.json(`Student with ID:${id} deleted successfully`)


}))



router.post('/add',asyncHandler(async(request,response,next)=>{

    try {
        let student = {
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            email: request.body.email,
            age: request.body.age,
            password:request.body.password
        }
    
        await addStudent(student);
    
        response.status(201).json(student);
    } catch (error) {
        next(error)
    }

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