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