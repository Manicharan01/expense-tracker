import { prismaClient } from "@/app/lib/db";
import { Category } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const editSchema = z.object({
    name: z.string(),
    amount: z.number(),
    category: z.nativeEnum(Category),
})

const dateSchema = z.coerce.date()

export async function PUT(req: NextRequest) {
    const { name, amount, category, id, date } = await req.json()
    console.log(date)

    try {
        const newEdit = editSchema.parse({ name, amount, category, id })
        const newDate = dateSchema.safeParse(date)

        await prismaClient.expense.update({
            where: {
                id: id[0]
            },
            data: {
                name: newEdit.name,
                amount: newEdit.amount,
                category: newEdit.category,
                date: newDate.data
            }
        })

        return NextResponse.json({ message: 'Successfull' }, { status: 200 })
    } catch (e) {
        console.log(e)

        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
