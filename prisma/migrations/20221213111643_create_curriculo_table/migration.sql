-- CreateTable
CREATE TABLE `Curriculo` (
    `id` VARCHAR(191) NOT NULL,
    `sumary` TEXT NULL,
    `last_company` VARCHAR(255) NOT NULL,
    `last_admission` DATE NOT NULL,
    `last_resignation` DATE NOT NULL,
    `last_activity` MEDIUMTEXT NOT NULL,
    `penultimate_company` VARCHAR(255) NOT NULL,
    `penultimate_admission` DATE NOT NULL,
    `penultimate_resignation` DATE NOT NULL,
    `penultimate_activity` MEDIUMTEXT NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Curriculo_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
