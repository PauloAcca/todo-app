import { NextRequest, NextResponse } from "next/server";
import { updateTask, deleteTask } from "@/lib/db";

export async function PUT (request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const body = await request.json();

        updateTask({ ...body, id: (await params).id });
        
        return NextResponse.json('Task updated successfully', {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json('Cannot update task', {
            status: 500,
        });
    }
}

export async function DELETE (request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    try {

        deleteTask((await params).id);

        return NextResponse.json('Task deleted successfully', {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json('Cannot delete task', {
            status: 500,
        });
    }
}