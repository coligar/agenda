/*
  Warnings:

  - You are about to alter the column `cpf` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(14)` to `Int`.
  - A unique constraint covering the columns `[cpf]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `cpf` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_cpf_key` ON `User`(`cpf`);
