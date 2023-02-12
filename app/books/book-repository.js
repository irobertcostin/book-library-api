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

        fs.writeFile(("./app/books/book.json"),JSON.stringify(data),(err,data)=>{

            if(err){
                reject(err)
            }else {
                resolve();
            }
        })

    })

}



export async function addBooks(book){

    let data = await getBooks();
    
    let ids = data.books.map(e => e.id)

    let id = Math.floor(Math.random() * 3000 + 1)

    while (ids.includes(id) === true) {
        id = Math.floor(Math.random() * 1000 + 1);
    }

    book.id = id;

    if(book.book_name===""&&book.created_at===""){

        throw new Error ("Missing book attributes")

    } else {
        data.books.push(book);
        await saveBooks(data);
    }


}
