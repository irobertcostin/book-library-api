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

        fs.writeFile(("./app/courses/course.json"),JSON.stringify(data),(err,data)=>{

            if(err){
                reject(err)
            }else {
                resolve();
            }
        })

    })

}



export async function addCourse(course){

    let data = await getCourses();
    let ids = data.courses.map(e=>e.id)
    let id = Math.floor(Math.random() * 3000 + 1)
    while (ids.includes(id) === true) {
        id = Math.floor(Math.random() * 1000 + 1);
    }

    // after no longer generating, the id is assigned to the new student
    course.id = id;

    if(course.name===""&&course.department===""){

        throw new Error ("Missing course information")

    } else {
        data.courses.push(course);
        await saveCourses(data);
    }


}