import {throws} from "assert";
import { errorMonitor } from "events";
import fs from "fs";
import path from "path";



export function getBooks(){
    
    return new Promise ((response,reject)=>{


        fs.readFile(("./app/books/book.json"),'utf-8',(err,data)=>{


            if(err){
                reject(err)
            }else {
                const json = JSON.parse(data)
                response(json);
            }
        })
    })

}



export async function saveBooks(data){

    return new Promise((resolve,reject)=>{

        fs.writeFile(("./app/books/book.json"),JSON.strinfigy(data),(err,data)=>{

            if(err){
                reject(err)
            }else {
                resolve();
            }
        })

    })

}

