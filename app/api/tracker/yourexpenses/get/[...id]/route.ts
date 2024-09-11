import { prismaClient } from "@/app/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id
    console.log(id)

    try {
        const expense = await prismaClient.expense.findFirst({
            where: {
                id: id[0]
            }
        })

        return NextResponse.json(expense)
    } catch (e) {
        console.log(e)

        return NextResponse.json(e)
    }
}
