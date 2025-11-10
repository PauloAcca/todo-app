"use client";
import TaskComponent from '@/components/taskComponent'
import { useEffect, useState } from 'react';
import type { Task } from "../types.ts/tasks";



export default function TaskList({reloadList=0}:{reloadList?:number}) {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskEdited, setTaskEdited] = useState<number>(0);
    
    useEffect(() => {
        allTasks();
    }, [reloadList, taskEdited]);

    const allTasks = async () => {
        const tasks = await fetch('/api/task', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!tasks.ok) {
            throw new Error('Fallo en la creacion de la tarea');
        }
        const data = await tasks.json();
        setTasks(data)
        return data;
    }

    
    return (
        <div className='flex flex-col gap-4 w-full p-4 border border-solid border-white rounded-xl mt-6'>
            <h2 className='text-2xl font-bold'>Lista de tareas</h2>
            {tasks.length > 0 ? tasks.map((task: Task) => (
                <TaskComponent key={task.id} task={task} editedRefresh={() => setTaskEdited(taskEdited+1)} />
            )) : <p>No hay tareas</p>}
        </div>
    )
}