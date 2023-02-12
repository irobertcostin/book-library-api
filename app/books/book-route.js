import  express  from "express";


import { getBooks,deleteBook } from "./book-repository.js";



const router = express.Router();





function asyncHandler(cb){


    return async (req,res,next)=>{

        try{
            await cb(req,res,next);

        }catch(err){

            next(err);
        }
    }
}


router.get('/all',asyncHandler(async(req,res)=>{


    const books= await getBooks();


    return res.json(books);

}));


// router.delete('/delete/id=:id'.asyncHandler(async(req,res)=>{

//     let id = request.params.id;

// }))



export default router;