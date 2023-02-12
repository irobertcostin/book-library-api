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



export async function editBook(book,id){

    let data =  await getBooks();
    

    let theBook = data.books.filter(e=>e.id==id)

    if(theBook.length==0){

        throw new Error("No editing possible, ID unexistent")


    } else if(book.book_name===""||book.created_at===""){

        throw new Error("No editing possible, empty fields")

    } else {

        data.books.forEach(element => {
            if(element.id==id){

                if(book.book_name){
                    element.book_name=book.book_name
                }
    
                if(book.created_at){
                    element.created_at=book.created_at
                }
            }
        });

        await saveBooks(data)

    }


}


export async function deleteBook(id){

    let data = await getBooks();

    let books = data.books.filter(e=>e.id==id)

    if(books.length==0){

        throw new Error("Invalid book ID")

    }else {

        data.books = data.books.filter(e=>e.id!=id)

        await saveBooks(data)

    }



}