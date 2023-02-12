import {throws} from "assert";
import { errorMonitor } from "events";
import fs from "fs";
import path from "path";


export function getStudents() {

    return new Promise ((response,reject)=>{


        fs.readFile(("./app/students/student.json"),'utf-8',(err,data)=>{

            if(err){
                reject(err)
            }else {

                // transform the response to JSON
                const json = JSON.parse(data)
                // respond with a json
                response(json);
            }


        })
    })

}

export async function saveStudents(data){

    return new Promise((resolve,reject)=>{

        fs.writeFile(("./app/students/student.json"),JSON.stringify(data),(err,data)=>{

            if(err){
                reject(err)
            }else {
                resolve();
            }
        })

    })

}


export async function addStudent (student){

    let data = await getStudents();

    let ids = data.students.map(e => e.id)

    let id = Math.floor(Math.random() * 3000 + 1)

    while (ids.includes(id) === true) {
        id = Math.floor(Math.random() * 1000 + 1);
    }

    // after no longer generating, the id is assigned to the new student
    student.id = id;

    if(student.first_name===""&&student.last_name===""&&student.email===""&&student.age===""){

        throw new Error ("Missing student attributes")

    } else {
        data.students.push(student);
        await saveStudents(data);
    }

}
