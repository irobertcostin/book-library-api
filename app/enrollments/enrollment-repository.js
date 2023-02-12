import {throws} from "assert";
import { errorMonitor } from "events";
import fs from "fs";
import path from "path";



export function getEnrollments(){
    
    return new Promise ((response,reject)=>{


        fs.readFile(("./app/enrollments/enrollment.json"),'utf-8',(err,data)=>{


            if(err){
                reject(err)
            }else {
                const json = JSON.parse(data)

                response(json);
            }



        })


    })

}

export async function saveEnrollments(data){

    return new Promise((resolve,reject)=>{

        fs.writeFile(("./app/enrollments/enrollment.json"),JSON.stringify(data),(err,data)=>{

            if(err){
                reject(err)
            }else {
                resolve();
            }
        })

    })

}



export async function addEnrollment (enrollment){

    let data = await getEnrollments();

    let ids = data.enrollment.map(e => e.id)

    let id = Math.floor(Math.random() * 3000 + 1)

    while (ids.includes(id) === true) {
        id = Math.floor(Math.random() * 1000 + 1);
    }

    // after no longer generating, the id is assigned to the new enrollment
    enrollment.id = id;

    if(enrollment.student_id===""&&enrollment.course_id===""&&enrollment.created_at===""){

        throw new Error ("Missing enrollment attributes")

    } else {
        data.enrollment.push(enrollment);
        await saveEnrollments(data);
    }

}


export async function editEnrollments(enrollment,id){

    let data =  await getEnrollments();

    let theEnroll = data.enrollment.filter(e=>e.id==id)

    if(theEnroll.length==0){

        throw new Error("No editing possible, ID unexistent")


    } else if(enrollment.student_id===""||enrollment.course_id===""||enrollment.created_at===""){

        throw new Error("No editing possible, empty fields")

    } else {

        data.enrollment.forEach(element => {
            if(enrollment.student_id){
                element.student_id=enrollment.student_id
            }

            if(enrollment.course_id){
                element.course_id=enrollment.course_id
            }

            if(enrollment.created_at){
                element.created_at=enrollment.created_at
            }
        });

        await saveEnrollments(data)

    }


}