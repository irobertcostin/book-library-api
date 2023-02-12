import express from "express";

import { getStudents } from "./student-repository.js";

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

export default router;