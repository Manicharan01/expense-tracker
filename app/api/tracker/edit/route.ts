import { prismaClient } from "@/app/lib/db";
import { Category } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const editSchema = z.object({
    name: z.string(),
    amount: z.number(),
    category: z.nativeEnum(Category),
    id: z.string(),
})

export async function PUT(req: NextRequest) {
    const { name, amount, category, id } = await req.json()

    try {
        const newEdit = editSchema.parse({ name, amount, category, id })

        await prismaClient.expense.update({
            where: {
                id: newEdit.id
            },
            data: {
                name: newEdit.name,
                amount: newEdit.amount,
                category: newEdit.category
            }
        })
    } catch (e) {
        console.log(e)

        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
