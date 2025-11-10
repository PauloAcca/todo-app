"use client";
import { useState } from "react";
import TaskDetails from "./taskDetails";
import type { Task } from "../types.ts/tasks";
import { FaCheck } from "react-icons/fa";


export default function TaskComponent({task, editedRefresh}: {task: Task, editedRefresh: () => void}) {
    const [completed, setCompleted] = useState<boolean>(task.completed);
    const [updateTask, setUpdateTask] = useState<boolean>(false);

    const updateTaskCompleted = async () => {
        setCompleted(!completed);

        const res = await fetch('/api/task/'+task.id,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({completed: !completed})
        })

        editedRefresh();

        if (!res.ok) {
            throw new Error('Fallo en la actualizacion de la tarea');
        }
    }

    
    return (
        <div className="flex">
            <button type="button" onClick={() => {setUpdateTask(true)}} className="flex justify-between grow border border-solid border-white p-4 rounded-xl text-left">
                {!completed ? <h2>{task.title}</h2> : <h2 className="line-through">{task.title}</h2>}
            </button>
            <button onClick={updateTaskCompleted} className="flex align-center w-[15%] md:w-[10%] justify-center ml-2 border border-solid border-white p-4 rounded-xl">
                {completed ? <FaCheck className="text-2xl" /> : ""}
            </button>
            {updateTask && <TaskDetails task={task} editedRefresh={editedRefresh} closeUpdate={() => {setUpdateTask(false)}}/>}
        </div>
        
    )
}