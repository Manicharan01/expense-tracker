import { Expense } from '@/app/dashboard/page';
import { atom } from 'recoil';

export const expenseState = atom<Expense>({
    key: 'expenseState',
    default: {
        id: "",
        name: "",
        amount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "",
        category: "Misc",
        date: new Date(),
    }
})
