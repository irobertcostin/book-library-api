import {throws} from "assert";
import { errorMonitor } from "events";
import fs from "fs";
import path from "path";



export function getCourses(){
    
    return new Promise ((response,reject)=>{


        fs.readFile(("./app/courses/course.json"),'utf-8',(err,data)=>{


            if(err){
                reject(err)
            }else {
                const json = JSON.parse(data)

                response(json);
            }



        })


    })

}

export async function saveCourses(data){

    return new Promise((resolve,reject)=>{

        fs.writeFile(("./app/courses/course.json"),JSON.strinfigy(data),(err,data)=>{

            if(err){
                reject(err)
            }else {
                resolve();
            }
        })

    })

}