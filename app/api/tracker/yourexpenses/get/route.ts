import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const getSchema = z.object({
    id: z.string(),
})

export async function GET(req: NextRequest) {
    const { id } = await req.json()

    try {
        const newGet = getSchema.parse({ id })

        const expenses = await prismaClient.expense.findMany({
            where: {
                userId: newGet.id
            },
            select: {
                id: true,
                name: true,
                amount: true,
                createdAt: true,
                updatedAt: true,
                userId: true,
                category: true
            }

        })

        return NextResponse.json(expenses)
    } catch (e) {
        console.log(e)

        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
