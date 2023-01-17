/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Contact`;

-- CreateTable
CREATE TABLE `Email` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `contact_type` ENUM('RESIDENTIAL', 'COMMERCIAL', 'PERSONAL') NOT NULL DEFAULT 'PERSONAL',
    `is_default_contact` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Email_email_key`(`email`),
    INDEX `Email_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Phone` (
    `id` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `contact_type` ENUM('RESIDENTIAL', 'COMMERCIAL', 'PERSONAL') NOT NULL DEFAULT 'RESIDENTIAL',
    `is_default_contact` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Phone_phone_key`(`phone`),
    INDEX `Phone_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
