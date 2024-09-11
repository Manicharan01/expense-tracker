import { Expense } from '@/app/dashboard/page'
import { selector } from 'recoil'
import { expenseState } from '@/app/store/atoms/expense'

export const expenseDetails = selector<Expense>({
    key: 'expenseDetailsState',
    get: ({ get }) => {
        const expense = get(expenseState)

        return expense
    }
})
