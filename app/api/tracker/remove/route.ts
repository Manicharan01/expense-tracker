import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const deleteSchema = z.object({
    id: z.string(),
})

export async function DELETE(req: NextRequest) {
    const { id } = await req.json()

    try {
        const newDelete = deleteSchema.parse({ id })

        await prismaClient.expense.delete({
            where: {
                id: newDelete.id
            }
        })
    } catch (e) {
        console.log(e)

        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
