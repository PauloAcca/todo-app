"use client";
import { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";

export default function TaskForm ({onCreated, close}: {onCreated: () => void, close: () => void}) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await fetch('/api/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description})
        });
        if (!res.ok) {
            throw new Error('Fallo en la creacion de la tarea');
        }
        setTitle('');
        setDescription('');
        close();
        onCreated();
    }

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/80 z-10">
            <div className="flex flex-col items-start justify-between gap-4 max-w-xl mx-auto rounded-xl border border-solid border-white-400 p-6 bg-black">
                <div className="flex items-center justify-between w-full">
                    <h2 className="text-2xl font-bold">Agregar Tarea</h2>
                    <button onClick={close} className="p-2 rounded-full bg-black hover:bg-white/20 transition-colors hover:text-white">
                        <VscChromeClose/>
                    </button>
                </div>
                
                <form action="submitTask" onSubmit={handleSubmit} className="flex flex-col items-start justify-between gap-4">
                    <input type="text" value={title} onChange={(event) => {setTitle(event.target.value)}} placeholder="Titulo" 
                        className="p-4 w-full rounded-xl bg-white/10 focus:bg-transparent transition-colors"/>
                    <textarea placeholder="Descripcion" rows={5} cols={50} value={description} onChange={(event) => {setDescription(event.target.value)}} 
                        className="resize-y w-full p-4 rounded-xl bg-white/10 focus:bg-transparent transition-colors"/>
                    <button type="submit" className="py-2 px-4 bg-white text-black rounded-full hover:bg-white/20 transition-colors hover:text-white">Agregar</button>
                </form>
            </div>
        </div>
    )
}