"use client";
import Image from "next/image";
import TaskForm from "@/components/taskForm";
import TaskList from "@/components/taskList";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  const [reload, setReaload] = useState(0);
  const [formTask, setFormTask] = useState(false);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-6 bg-white dark:bg-black sm:items-start md:px-16">
        <div className="flex w-full justify-between flex-col items-center md:flex-row">
          <div className="flex flex-col items-center gap-6 sm:items-start sm:text-left">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Anotador
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400 text-center">
              Apreta el boton + para agregar una nueva tarea.
            </p>
          </div>
          <button onClick={() => setFormTask(!formTask)} className="p-2 rounded-full bg-white  hover:bg-white/20 transition-colors hover:text-white mt-4">
            <FaPlus className="text-4xl text-black rounded-full"/>
          </button>
        </div>
        {formTask && <TaskForm onCreated={() => setReaload(reload + 1)} close={() => setFormTask(false)}/>}
        <TaskList reloadList={reload}/>
      </main>
    </div>
  );
}
