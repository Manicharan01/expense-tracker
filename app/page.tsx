import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart2, Calendar, Lock } from "lucide-react"
import Link from "next/link"
import { Appbar } from "@/app/components/Appbar"

export default function Component() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
            <Appbar />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Take Control of Your Finances
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                                    Track, analyze, and optimize your personal expenses with our easy-to-use expense tracker.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Button variant='secondary' size="lg">Get Started</Button>
                                <Button size="lg" variant="outline">Learn More</Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                            Key Features
                        </h2>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                            <div className="flex flex-col items-center space-y-2 border border-gray-700 p-6 rounded-lg bg-gray-800 max-w-sm w-full">
                                <BarChart2 className="h-12 w-12 text-primary text-white" />
                                <h3 className="text-xl font-bold">Expense Analytics</h3>
                                <p className="text-sm text-gray-400 text-center">
                                    Visualize your spending patterns with intuitive charts and graphs.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 border border-gray-700 p-6 rounded-lg bg-gray-800 max-w-sm w-full">
                                <Calendar className="h-12 w-12 text-primary text-white" />
                                <h3 className="text-xl font-bold">Budget Planning</h3>
                                <p className="text-sm text-gray-400 text-center">
                                    Set monthly budgets and track your progress towards financial goals.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 border border-gray-700 p-6 rounded-lg bg-gray-800 max-w-sm w-full">
                                <Lock className="h-12 w-12 text-primary text-white" />
                                <h3 className="text-xl font-bold">Secure & Private</h3>
                                <p className="text-sm text-gray-400 text-center">
                                    Your financial data is encrypted and protected with the latest security measures.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Start Your Financial Journey Today
                                </h2>
                                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Join thousands of users who have taken control of their finances. Sign up now and get a 30-day free trial.
                                </p>
                            </div>
                            <div className="w-full max-w-sm space-y-2">
                                <form className="flex space-x-2">
                                    <Input className="flex-1 bg-gray-800 border-gray-700" placeholder="Enter your email" type="email" />
                                    <Button variant='secondary' type="submit">Sign Up</Button>
                                </form>
                                <p className="text-xs text-gray-400">
                                    By signing up, you agree to our{" "}
                                    <Link className="underline underline-offset-2 hover:text-primary" href="#">
                                        Terms & Conditions
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="w-full py-6 border-t border-gray-800">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <p className="text-xs text-gray-400">© 2023 Personal Expense Tracker. All rights reserved.</p>
                        <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
                            <Link className="text-xs hover:text-primary" href="#">
                                Terms of Service
                            </Link>
                            <Link className="text-xs hover:text-primary" href="#">
                                Privacy
                            </Link>
                        </nav>
                    </div>
                </div>
            </footer>
        </div>
    )
}
