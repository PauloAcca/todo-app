import { createTask, listTasks} from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET () {
    const list = await listTasks();
    
    return NextResponse.json(list);
}

export async function POST (request: NextRequest) {
    try {
        const body = await request.json();

        createTask(body);

        return NextResponse.json('Task created successfully', {
            status: 201,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json('Cannot post task', {
            status: 500,
        });
    }
}