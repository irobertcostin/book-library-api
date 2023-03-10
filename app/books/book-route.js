import  express  from "express";

import { getBooks,deleteBook,addBooks,editBook,getBookById } from "./book-repository.js";

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


router.get('/by-id/id=:id',asyncHandler(async(req,res)=>{

    let id = req.params.id;

    let book=await getBookById(id);

    res.status(211).json(book)



}))


router.delete('/delete/id=:id',asyncHandler(async(req,res)=>{

    let id = req.params.id;
    await deleteBook(id);

    return res.json(`Book with ID:${id} deleted successfully`)
}))



router.post('/add',asyncHandler(async(req,res)=>{

    let book = {

        book_name: req.body.book_name,
        created_at: req.body.created_at,
        author:req.body.author
    }

    await addBooks(book);

    res.status(206).json(book)

}))

router.put('/edit/id=:id',asyncHandler(async(request,response)=>{

    let id = request.params.id

    let book = {
        book_name: request.body.book_name,
        created_at: request.body.created_at,
        author:request.body.author
    }

    await editBook(book, id)

    response.status(207).json(book)

}))



export default router;