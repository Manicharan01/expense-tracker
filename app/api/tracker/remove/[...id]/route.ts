import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id

    try {
        await prismaClient.expense.delete({
            where: {
                id: id[0]
            }
        })

        return NextResponse.json({ message: "Success" }, { status: 200 })
    } catch (e) {
        console.log(e)

        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
