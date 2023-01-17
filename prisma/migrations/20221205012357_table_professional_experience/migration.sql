/*
  Warnings:

  - You are about to alter the column `cpf` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(14)`.
  - Added the required column `updatedAt` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ScheduleType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Address` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Contact` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `ScheduleType` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `cpf` VARCHAR(14) NULL;

-- CreateTable
CREATE TABLE `ProfessionalExperience` (
    `id` VARCHAR(191) NOT NULL,
    `company` VARCHAR(255) NOT NULL,
    `admission` DATE NOT NULL,
    `resignation` DATE NOT NULL,
    `activity` MEDIUMTEXT NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ProfessionalExperience_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Address_userId_idx` ON `Address`(`userId`);

-- CreateIndex
CREATE INDEX `Contact_userId_idx` ON `Contact`(`userId`);

-- CreateIndex
CREATE INDEX `User_area_activityId_idx` ON `User`(`area_activityId`);
