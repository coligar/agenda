/*
  Warnings:

  - You are about to drop the column `userId` on the `ProfessionalExperience` table. All the data in the column will be lost.
  - Added the required column `resumeId` to the `ProfessionalExperience` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `ProfessionalExperience_userId_idx` ON `ProfessionalExperience`;

-- AlterTable
ALTER TABLE `ProfessionalExperience` DROP COLUMN `userId`,
    ADD COLUMN `resumeId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Resume` (
    `id` VARCHAR(191) NOT NULL,
    `sumary` TEXT NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Resume_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `ProfessionalExperience_resumeId_idx` ON `ProfessionalExperience`(`resumeId`);
