import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/app/lib/db";

export async function GET(req: NextRequest) {
    const session = await getServerSession();

    const user = await prismaClient.user.findUnique({
        where: {
            email: session?.user?.email ?? "",
        }
    })

    try {
        const allExpenses = await prismaClient.expense.findMany({
            where: {
                userId: user?.id
            }
        })

        return NextResponse.json(allExpenses)
    } catch (e) {
        console.log(e)

        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
