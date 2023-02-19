import { addBooks, deleteBook, editBook, getBooks, saveBooks } from "./books/book-repository.js";
import { addCourse, deleteCourse, editCourse, getCourses, saveCourses } from "./courses/course-repository.js";
import { addEnrollment, deleteEnrollment, editEnrollments, getEnrollments, saveEnrollments } from "./enrollments/enrollment-repository.js";
import { getStudents, saveStudents, addStudent, editStudent, deleteStudent } from "./students/student-repository.js";

import express, { json, request, response } from "express";



import bookRoutes from "./books/book-route.js";
import courseRoutes from "./courses/course-route.js";
import enrollmentRoutes from "./enrollments/enrollment-route.js"
import studentRoutes from "./students/student-route.js"

import cors from "cors";


// express server

const app = express();

// which returns json 

app.use(express.json());

// middleware to send requests from other origins to the back-end

app.use(cors());



app.use("/api/v1/books",bookRoutes);

app.use("/api/v1/courses",courseRoutes);

app.use("/api/v1/enrollments",enrollmentRoutes)

app.use("/api/v1/students",studentRoutes)







app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});






app.listen(3200, () => {

    console.log("server started")

})




// de lucrat erorile pentru acelasi student, carte, etc , incat sa nu se suprapopuleze daca au mai fost intrari
// de facut client
// de refacut get by id pentru toti