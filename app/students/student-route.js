import express from "express";

import { getStudents , deleteStudent,addStudent,editStudent, getStudentsById, loginCheck, getStudentsByEmail } from "./student-repository.js";

const router = express.Router();


// asyncHandler de callback (un ceva, orice, care va fi async de rreq,res,next)

function asyncHandler(callback) {

    return async (req,res,next)=>{
// incearca acel ceva cu req res next
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

router.get('/by-email/email=:email',asyncHandler(async(req,res)=>{


    let email = req.params.email;

    let student=await getStudentsByEmail(email);

    res.status(213).json(student)



}))


router.post('/login',asyncHandler(async(req,res)=>{

    // POST for credentials hide

    let studentToCheck = {
        email:req.body.email,
        password:req.body.password
    }

    await loginCheck(studentToCheck)

    return res.status(212).json("Successfully logged in");


}))


router.delete('/delete/id=:id',asyncHandler(async(req,res)=>{

    let id = req.params.id;

    await deleteStudent(id);

    return res.status(220).json(`Student with ID:${id} deleted successfully`)


}))



router.post('/add',asyncHandler(async(request,response)=>{

    
        let student = {
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            email: request.body.email,
            age: request.body.age,
            password:request.body.password
        }

        let data = await getStudents();
        let check = data.students.filter(e=>e.email==student.email)
        console.log(check.length)
        if(check.length==0){
            await addStudent(student);
    
        response.status(201).json(student);
        }else {
            response.status(450).json('This email address is already registered')
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