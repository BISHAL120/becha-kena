import db from "@/prisma/db";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const body = await request.json();


        if (!body) {
            return NextResponse.json(
                { message: "Data is required" },
                { status: 400 }
            );
        }

        for (let i = 0; i < body.length; i++) {
            await db.benefits.create({
                data: {
                    title: body[i].title,
                }
            })
        }

        return NextResponse.json({ message: "Benefits added successfully" }, { status: 201 });

    } catch (error) {
        console.log("Error creating benefit:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}


export async function DELETE(request: Request) {
    try {
        const body = await request.json();

        if (!body.id) {
            return NextResponse.json(
                { message: "Benefit ID is required" },
                { status: 400 }
            );
        }

        const result = await db.benefits.delete({
            where: {
                id: body.id
            }
        });

        return NextResponse.json(
            { data: result, message: "Benefit deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.log("Error deleting benefit:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
