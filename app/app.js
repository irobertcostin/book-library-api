import { addBooks, deleteBook, editBook, getBooks, saveBooks } from "./books/book-repository.js";
import { addCourse, deleteCourse, editCourse, getCourses, saveCourses } from "./courses/course-repository.js";
import { addEnrollment, deleteEnrollment, editEnrollments, getEnrollments, saveEnrollments } from "./enrollments/enrollment-repository.js";
import { getStudents, saveStudents, addStudent, editStudent, deleteStudent } from "./students/student-repository.js";

import express, { json, request, response } from "express";
import cors from "cors";


// express server

const app = express();

// which returns json 

app.use(express.json());

// middleware to send requests from other origins to the back-end

app.use(cors());


app.use((req, res, next) => {


    console.log("1st logger")

    next();

})


// GET asyncs

app.get('/books', async (request, response) => {
    console.log("ajunge?")
    const books = await getBooks();


    response.json(books)

})

app.get('/courses', async (request, response) => {

    const courses = await getCourses();


    response.json(courses)

})


app.get('/enrollments', async (request, response) => {

    const enrollments = await getEnrollments();


    response.json(enrollments)

})

app.get('/students', async (request, response) => {

    const students = await getStudents();


    response.json(students)

})




// POST asyncs

app.post('/students/add', async (request, response, next) => {



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


app.post('/enrollments/add', async (request, response, next) => {



    try {
        let enrollment = {
            student_id: request.body.student_id,
            course_id: request.body.course_id,
            created_at: request.body.created_at

        }



        await addEnrollment(enrollment);

        // json response, of a JSON parsed object 
        response.status(202).json(enrollment);

    } catch (error) {
        console.log(error)
        next(error);
    }



})


app.post('/courses/add', async (request, response, next) => {


    try {

        let course = {
            name: request.body.name,
            department: request.body.department
        }

        await addCourse(course);

        response.status(203).json(course)


    } catch (error) {
        console.log(error)
        next(error)
    }
})


app.post('/books/add', async (request, response, next) => {


    try {

        let book = {

            book_name: request.body.book_name,
            created_at: request.body.created_at
        }

        await addBooks(book);

        response.status(206).json(book)

    } catch (error) {
        console.log(error)
        next(error)
    }



})



// PUT asyncs 

app.put('/books/edit/id=:id', async (request, response, next) => {

    try {
        // request the param id marked with :
        let id = request.params.id

        let book = {
            book_name: request.body.book_name,
            created_at: request.body.created_at
        }

        await editBook(book, id)

        response.status(207).json(book)

    } catch (error) {
        console.log(error)
        next(error)
    }
})


app.put('/courses/edit/id=:id', async (request, response, next) => {

    try {
        // request the param id marked with :
        let id = request.params.id

        let course = {
            name: request.body.name,
            department: request.body.department
        }

        await editCourse(course, id)

        response.status(208).json(course)

    } catch (error) {
        console.log(error)
        next(error)
    }
})


app.put('/enrollments/edit/id=:id', async (request, response, next) => {

    try {
        // request the param id marked with :
        let id = request.params.id

        let enrollment = {
            student_id: request.body.student_id,
            course_id: request.body.course_id,
            created_at: request.body.created_at
        }

        await editEnrollments(enrollment, id)

        response.status(209).json(enrollment)

    } catch (error) {
        console.log(error)
        next(error)
    }
})

app.put('/students/edit/id=:id', async (request, response, next) => {

    try {
        // request the param id marked with :
        let id = request.params.id

        let student = {
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            email: request.body.email,
            age:request.body.age
        }

        await editStudent(student, id)

        response.status(210).json(student)

    } catch (error) {
        console.log(error)
        next(error)
    }
})


// DELETE asyncs 

app.delete('/books/delete/id=:id',async(request,response,next)=>{


    try {
        let id = request.params.id

        await deleteBook(id)

        response.status(211).json("Book deleted successfully")

    } catch (error) {
        console.log(error)
        next(error)
    }
})


app.delete('/courses/delete/id=:id',async(request,response,next)=>{


    try {
        let id = request.params.id

        await deleteCourse(id)

        response.status(212).json("Course deleted successfully")

    } catch (error) {
        console.log(error)
        next(error)
    }
})


app.delete('/enrollments/delete/id=:id',async(request,response,next)=>{


    try {
        let id = request.params.id

        await deleteEnrollment(id)

        response.status(213).json("Enrollment deleted successfully")

    } catch (error) {
        console.log(error)
        next(error)
    }
})


app.delete('/students/delete/id=:id',async(request,response,next)=>{


    try {
        let id = request.params.id

        await deleteStudent(id)

        response.status(214).json("Student deleted successfully")

    } catch (error) {
        console.log(error)
        next(error)
    }
})













app.use((req, res, next) => {

    const error = new Error("Not found");

    error.status = 404;

    next(error);


})


app.use((err, req, res, next) => {


    res.status(err.status || 500);

    res.json({

        error: {
            message: err.message
        }

    })


})






app.listen(3200, () => {

    console.log("server started")

})