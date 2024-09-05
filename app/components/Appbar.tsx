"use client";

import { Button } from "@/components/ui/button";
import { PiggyBank } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function Appbar() {
    const session = useSession()

    return (
        <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b border-gray-800">
            <Link className="flex items-center justify-center" href="#">
                <PiggyBank className="h-6 w-6 text-primary text-white" />
                <span className="ml-2 text-lg font-semibold">Expense Tracker</span>
            </Link>
            <nav className="flex items-center gap-4 sm:gap-6">
                <Link className="text-sm font-medium hover:text-primary" href="#">
                    Features
                </Link>
                <Link className="text-sm font-medium hover:text-primary" href="#">
                    Pricing
                </Link>
                <Link className="text-sm font-medium hover:text-primary" href="#">
                    About
                </Link>
                {session.data?.user && (
                    <div className="flex justify-center items-center">
                        <Button
                            variant="secondary"
                            className="text-black"
                            onClick={() => {
                                signOut();
                            }}
                        >
                            Log Out
                        </Button>
                    </div>
                )}
                {!session.data?.user && (
                    <Button
                        variant="secondary"
                        className="text-black"
                        onClick={() => {
                            signIn();
                        }}
                    >
                        Sign In
                    </Button>
                )}
            </nav>
        </header>
    )
}
