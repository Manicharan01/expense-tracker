"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle, DollarSign, Calendar, Tag } from "lucide-react"
import { Category } from '@prisma/client';
import { signOut } from "next-auth/react"
import Link from "next/link"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export interface Expense {
    id: string;
    name: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    category: Category;
    date: Date;
}

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

const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
    { code: "JPY", symbol: "¥" },
]

const dateFilters = [
    { value: "all", label: "All Time" },
    { value: "week", label: "Last Week" },
    { value: "month", label: "Last Month" },
    { value: "3months", label: "Last 3 Months" },
    { value: "custom", label: "Custom Range" },
]

export default function Dashboard() {
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [name, setName] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [date, SetDate] = useState(new Date())

    useEffect(() => {
        getExpenses()
    }, [])

    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])
    const [selectedDateFilter, setSelectedDateFilter] = useState("all")
    const [customStartDate, setCustomStartDate] = useState("")
    const [customEndDate, setCustomEndDate] = useState("")

    async function getExpenses() {
        const res = await fetch(`http://localhost:3000/api/tracker/yourexpenses/getall`);
        const json = await res.json()
        setExpenses(json)
    }

    const filterExpensesByDate = (expense) => {
        const expenseDate = new Date(expense.date)
        const today = new Date()
        switch (selectedDateFilter) {
            case "week":
                const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
                return expenseDate >= lastWeek
            case "month":
                const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
                return expenseDate >= lastMonth
            case "3months":
                const last3Months = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate())
                return expenseDate >= last3Months
            case "custom":
                const startDate = new Date(customStartDate)
                const endDate = new Date(customEndDate)
                return expenseDate >= startDate && expenseDate <= endDate
            default:
                return true
        }
    }

    const filteredExpenses = expenses
        .filter(expense => selectedCategory === "All" || expense.category === selectedCategory)
        .filter(filterExpensesByDate)

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
            <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b border-gray-800">
                <h1 className="text-2xl font-bold">Expense Dashboard</h1>
                <div className="flex items-center space-x-4">
                    <Button onClick={async () => {
                        signOut()
                    }}>Log Out</Button>
                    <Select value={selectedCurrency.code} onValueChange={(value) => setSelectedCurrency(currencies.find(c => c.code === value))}>
                        <SelectTrigger className="w-[100px] bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Currency" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700">
                            {currencies.map((currency) => (
                                <SelectItem key={currency.code} value={currency.code}>
                                    {currency.code} ({currency.symbol})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Expense
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100">
                            <DialogHeader>
                                <DialogTitle>Add New Expense</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={async (e) => {
                                e.preventDefault()
                                await fetch(`http://localhost:3000/api/tracker/add`, {
                                    method: 'POST',
                                    headers: {
                                        'content-type': 'appilication/json'
                                    },
                                    body: JSON.stringify({
                                        name: name,
                                        amount: amount,
                                        date: date,
                                        category: category
                                    })
                                }).then(() => {
                                    getExpenses()
                                })
                            }} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                        className="bg-gray-700 border-gray-600"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select name="category" value={category} onValueChange={(value: any) => {
                                        setCategory(() => (value))
                                    }} required>
                                        <SelectTrigger className="bg-gray-700 border-gray-600">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-700">
                                            {categories.slice(1).map((category) => (
                                                <SelectItem key={category} value={category}>{category}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="amount">Amount ({selectedCurrency.symbol})</Label>
                                    <Input
                                        id="amount"
                                        name="amount"
                                        type="number"
                                        step="0.01"
                                        value={amount}
                                        onChange={(e) => {
                                            setAmount(Number(e.target.value))
                                        }}
                                        className="bg-gray-700 border-gray-600"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input
                                        id="date"
                                        name="date"
                                        type="date"
                                        value={date.toISOString().slice(0, 10)}
                                        onChange={(e) => {
                                            SetDate(new Date(e.target.value))
                                        }}
                                        className="bg-gray-700 border-gray-600"
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">Add Expense</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </header>
            <main className="flex-1 p-4 md:p-6 overflow-auto">
                <div className="mb-4 flex flex-wrap gap-4">
                    <div>
                        <Label htmlFor="category-filter" className="mr-2">Category:</Label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger id="category-filter" className="w-[180px] bg-gray-700 border-gray-600">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700">
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>{category}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="date-filter" className="mr-2">Date Range:</Label>
                        <Select value={selectedDateFilter} onValueChange={setSelectedDateFilter}>
                            <SelectTrigger id="date-filter" className="w-[180px] bg-gray-700 border-gray-600">
                                <SelectValue placeholder="Select date range" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700">
                                {dateFilters.map((filter) => (
                                    <SelectItem key={filter.value} value={filter.value}>{filter.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {selectedDateFilter === "custom" && (
                        <>
                            <div>
                                <Label htmlFor="start-date" className="mr-2">Start Date:</Label>
                                <Input
                                    id="start-date"
                                    type="date"
                                    value={customStartDate}
                                    onChange={(e) => setCustomStartDate(e.target.value)}
                                    className="bg-gray-700 border-gray-600"
                                />
                            </div>
                            <div>
                                <Label htmlFor="end-date" className="mr-2">End Date:</Label>
                                <Input
                                    id="end-date"
                                    type="date"
                                    value={customEndDate}
                                    onChange={(e) => setCustomEndDate(e.target.value)}
                                    className="bg-gray-700 border-gray-600"
                                />
                            </div>
                        </>
                    )}
                </div>
                <div className="rounded-lg border border-gray-800 bg-gray-800">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredExpenses.map((expense) => (
                                <TableRow key={expense.id}>
                                    <TableCell><Link href={`http://localhost:3000/edit/${expense.id}`} className="text-blue-400 hover:underline">{expense.name}</Link></TableCell>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center">
                                            <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                                            {String(expense.date).slice(0, 10)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Tag className="mr-2 h-4 w-4 text-gray-400" />
                                            {expense.category}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <DollarSign className="mr-2 h-4 w-4 text-gray-400" />
                                            {expense.amount.toFixed(2)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" size="sm">Delete</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="bg-zinc-800 text-zinc-50 border border-zinc-700">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription className="text-zinc-400">
                                                        This action cannot be undone. This will permanently delete the blog post.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel className="bg-zinc-700 text-zinc-50 hover:bg-zinc-600">Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={async () => {
                                                        await fetch(`http://localhost:3000/api/tracker/remove/${expense.id}`, {
                                                            method: "DELETE",
                                                            headers: {
                                                                "content-type": "application/json"
                                                            },
                                                        })
                                                        getExpenses()
                                                    }} className="bg-red-600 text-zinc-50 hover:bg-red-700">
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </div>
    )
}
