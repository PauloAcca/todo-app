import sqlite3 from "sqlite3"
import { open } from "sqlite"
import type { Task } from "../types.ts/tasks";

export async function openDB(){
    const db = await open({
        filename: process.env.DATABASE_URL || "",
        driver: sqlite3.Database
    })

    await db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            completed INTEGER DEFAULT 0,
            createdAt TEXT,
            updatedAt TEXT
        )
    `)

    return db
}

export const listTasks = async () => { 
    const db = await openDB();
    const rows = await db.all<Task[]>('SELECT * FROM tasks ORDER BY createdAt DESC');
    const tasks = rows.map((task: Task) => {
        return {
            ...task,
            completed: !!task.completed,
        }
    });
 
    return tasks;
};

export const createTask = async (taskDetails: {title: string, description?: string} ) => {

    const now = new Date().toISOString();

    const newTask: Task = {
        id: Date.now().toString(),
        title: taskDetails.title,
        description: taskDetails.description,
        completed: false,
        createdAt: now,
        updatedAt: now,
    }

    const db = await openDB();
    await db.run(`
        INSERT INTO tasks (id, title, description, completed, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [
        newTask.id,
        newTask.title,
        newTask.description,
        newTask.completed ? 1 : 0,
        newTask.createdAt,
        newTask.updatedAt
    ])
};

export async function getTask(id: string): Promise<Task | undefined> {
  const db = await openDB();
  const row = await db.get<Task>("SELECT * FROM tasks WHERE id = ?", id);
  return row ;
}

export const updateTask = async (updatedTask: {title: string, description: string, completed: boolean, id: string}) => {

    const now = new Date().toISOString();
    
    const existing = await getTask(updatedTask.id);
    if (!existing) {
        throw new Error('Task not found');
    }
    const title = updatedTask.title ?? existing.title;
    const description = updatedTask.description ?? existing.description;
    const completed =
    typeof updatedTask.completed === "boolean" ? (updatedTask.completed ? 1 : 0) : (existing.completed ? 1 : 0);
    const db = await openDB();
    await db.run(`
        UPDATE tasks SET title = $1, description = $2, completed = $3, updatedAt = $4 WHERE id = $5
    `,
    [
        title,
        description,
        completed,
        now,
        updatedTask.id
    ])
};

export const deleteTask = async (id: string) => {
    const db = await openDB();
    await db.run(`
        DELETE FROM tasks WHERE id = $1
    `,
    [
        id
    ])
};