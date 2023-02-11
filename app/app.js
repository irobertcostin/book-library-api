import { getBooks ,saveBooks} from "./books/book-repository.js";
import { getCourses ,saveCourses} from "./courses/course-repository.js";
import { getEnrollments ,saveEnrollments} from "./enrollments/enrollment-repository.js";
import { getStudents ,saveStudents,addStudent} from "./students/student-repository.js";

import express, {json,request,response} from "express";
import cors from "cors";


// express server

const app = express();

// which returns json 

app.use(express.json());

// middleware to send requests from other origins to the back-end

app.use(cors());


app.use((req,res,next)=>{


    console.log("1st logger")

    next();

})



app.get('/books',async(request,response)=>{
    console.log("ajunge?")
    const books = await getBooks();
    
    
    response.json(books)

})

app.get('/courses',async(request,response)=>{
    
    const courses = await getCourses();
    
    
    response.json(courses)

})


app.get('/enrollments',async(request,response)=>{
    
    const enrollments = await getEnrollments();
    
    
    response.json(enrollments)

})

app.get('/students',async(request,response)=>{
    
    const students = await getStudents();
    
    
    response.json(students)

})

app.post('/students/add',async (request,response,next)=>{

    console.log("aici")

    try {
            let student = {
                first_name: request.body.first_name,
                last_name: request.body.last_name,
                email: request.body.email,
                age: request.body.age
            }



            await addStudent(student);

            // json response, of a JSON parsed object 
            response.status(201).json(student);
        
    } catch (error) {
        console.log(error)
        next(error);
    }



})



/// am ramas aici
app.post('/enrollments/add',async (request,response,next)=>{

    console.log("aici")

    try {
            let student = {
                first_name: request.body.first_name,
                last_name: request.body.last_name,
                email: request.body.email,
                age: request.body.age
            }



            await addStudent(student);

            // json response, of a JSON parsed object 
            response.status(201).json(student);
        
    } catch (error) {
        console.log(error)
        next(error);
    }



})










app.use((req,res,next)=>{

    const error = new Error ("Not found");

    error.status=404;

    next(error);


})


app.use((err,req,res,next)=>{


    res.status(err.status||500);

    res.json({

        error:{
            message:err.message
        }

    })


})






app.listen(3200, () => {

    console.log("server started")

})