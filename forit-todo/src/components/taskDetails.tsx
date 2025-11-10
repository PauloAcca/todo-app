"use client";
import { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import type { Task } from "../types.ts/tasks";

export default function TaskDetails ({ task, closeUpdate, editedRefresh }: { task: Task; closeUpdate: () => void; editedRefresh: () => void }) {

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await fetch('/api/task/'+task.id,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description})
        })
        if (!res.ok) {
            throw new Error('Fallo en la actualizacion de la tarea');
        }
        closeUpdate();
        editedRefresh();
    }

    const handleDelete = async () => {
        const res = await fetch('/api/task/'+task.id,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!res.ok) {
            throw new Error('Fallo en la eliminacion de la tarea');
        }
        closeUpdate();
        editedRefresh();
    }

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/80 z-10">
            <div className="flex flex-col items-start justify-between gap-4 max-w-xl mx-auto rounded-xl border border-solid border-white-400 p-6 bg-black">
                <div className="flex items-start justify-between gap-4 w-full">
                    <h2 className="text-2xl font-bold">Editar Tarea</h2>
                    <button onClick={() => closeUpdate()} className="p-2 rounded-full bg-black hover:bg-white/20 transition-colors hover:text-white"> 
                        <VscChromeClose/>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col items-start justify-between gap-4">
                    <input type="text" value={title} onChange={(event) => {setTitle(event.target.value)}} placeholder="Titulo" 
                        className="p-4 w-full rounded-xl bg-white/10 focus:bg-transparent transition-colors" />
                    <textarea placeholder="Descripcion" rows={5} cols={50} value={description} onChange={(event) => {setDescription(event.target.value)}} 
                        className="resize-y w-full p-4 rounded-xl bg-white/10 focus:bg-transparent transition-colors"></textarea>
                    <div className="flex items-center justify-between w-full gap-2">
                        {task.completed ? <p className="text-green-500"> Tarea completada </p> : <p className="text-red-500"> Tarea pendiente </p>}
                        <p>Creada: {new Date(task.createdAt).toLocaleDateString("es-AR")}</p>
                        <p>Actualizada: {new Date(task.updatedAt).toLocaleDateString("es-AR")}</p>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <button type="submit" className="py-2 px-4 bg-white text-black rounded-full hover:bg-white/20 transition-colors hover:text-white">Actualizar</button>
                        <button type="button" onClick={() => handleDelete()} className="py-2 px-4 bg-white text-black rounded-full hover:bg-white/20 transition-colors hover:text-white">Borrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}