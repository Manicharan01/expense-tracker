"use client";

import { Expense } from "@/app/dashboard/page";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRecoilState, useRecoilValue } from "recoil";
import { expenseState } from "@/app/store/atoms/expense";
import { expenseDetails } from "@/app/store/selectors/expense";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const categories = [
    "All",
    "Groceries",
    "Leisure",
    "Electronics",
    "Utilities",
    "Clothing",
    "Health",
    "Misc"
]

export default function Component() {
    const { id } = useParams()
    const [requiredExpense, setRequiredExpense] = useRecoilState(expenseState)

    async function getExpense() {
        await fetch(`http://localhost:3000/api/tracker/yourexpenses/get/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => {
            res.json().then(data => {
                setRequiredExpense(data)
            })
        })
    }

    useEffect(() => {
        getExpense()
    }, [])

    return (
        <div className="flex flex-col justify-center items-center h-screen"><Updatecard /></div>
    );
}

export function Updatecard() {
    const expense = useRecoilValue(expenseDetails)
    const [name, setName] = useState(expense.name)
    const [amount, setAmount] = useState(expense.amount)
    const [category, setCategory] = useState(expense.category)
    const { id } = useParams()


    return (
        <div>
            <Card className="flex flex-col justify-center items-center bg-primary">
                <CardHeader>
                    <CardTitle className="text-secondary">Update Post</CardTitle>
                    <CardDescription className="text-secondary">Change either Title or Content</CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        className="mb-4 text-secondary"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        placeholder="Name"
                    ></Input>
                    <Input
                        className="text-secondary mb-4"
                        type="number"
                        value={amount}
                        onChange={(e) => {
                            setAmount(Number(e.target.value))
                        }}
                        placeholder="Content"
                    ></Input>
                    <Select name="category" value={category} onValueChange={(value: any) => {
                        setCategory(() => (value))
                    }} required>
                        <SelectTrigger className="bg-secondary border-primary">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-secondary">
                            {categories.slice(1).map((category) => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
                <CardFooter>
                    <Button
                        variant="secondary"
                        onClick={async () => {
                            await fetch(`http://localhost:3000/api/tracker/edit`, {
                                method: 'PUT',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify({
                                    id,
                                    name,
                                    amount,
                                    category
                                })
                            })
                        }}
                    >Update</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
