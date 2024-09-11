/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Expense` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Expense_name_userId_key" ON "Expense"("name", "userId");
