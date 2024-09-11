import { prismaClient } from '@/app/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';
import { Category } from '@prisma/client';

const expenseSchema = z.object({
    name: z.string(),
    amount: z.number(),
    body: z.object({
        category: z.nativeEnum(Category),
    })
})

const dateSchema = z.coerce.date()

export async function POST(req: NextRequest) {
    const session = await getServerSession();
    const { name, amount, category, date } = await req.json();

    const user = await prismaClient.user.findUnique({
        where: {
            email: session?.user?.email ?? "",
        }
    })

    try {
        const newExpense = expenseSchema.parse({ name, amount, body: { category }, date });
        const newDate = dateSchema.safeParse(date)
        console.log(newDate)

        await prismaClient.expense.create({
            data: {
                name: newExpense.name,
                amount: newExpense.amount,
                category: newExpense.body.category,
                userId: user?.id ?? "",
                date: newDate?.data ?? ""
            }
        })

        return NextResponse.json({ success: true }, { status: 200 })

    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
