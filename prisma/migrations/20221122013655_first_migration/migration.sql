-- CreateTable
CREATE TABLE `Schedule` (
    `id` VARCHAR(191) NOT NULL,
    `day` DATE NOT NULL,
    `starttime` TIME(0) NOT NULL,
    `endtime` TIME(0) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `status` ENUM('ACTIVE', 'RESCHEDULED', 'CANCELED', 'FINISHED') NOT NULL DEFAULT 'ACTIVE',
    `interviewer` VARCHAR(191) NULL,
    `schedule_typeId` VARCHAR(191) NULL,
    `area_activityId` VARCHAR(191) NULL,

    UNIQUE INDEX `Schedule_userId_key`(`userId`),
    UNIQUE INDEX `Schedule_interviewer_key`(`interviewer`),
    UNIQUE INDEX `Schedule_schedule_typeId_key`(`schedule_typeId`),
    UNIQUE INDEX `Schedule_area_activityId_key`(`area_activityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `avatar` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `account_verified` BOOLEAN NOT NULL DEFAULT false,
    `account_verified_date` DATETIME(3) NULL,
    `birth_date` DATE NULL,
    `cpf` VARCHAR(191) NULL,
    `have_desability` BOOLEAN NOT NULL DEFAULT false,
    `lastname` VARCHAR(191) NULL,
    `own_car` BOOLEAN NOT NULL DEFAULT false,
    `password` VARCHAR(191) NULL,
    `rg` VARCHAR(191) NULL,
    `sex` ENUM('F', 'M') NULL,
    `status` ENUM('ACTIVE', 'CANCELED', 'NOTVERIFIED', 'INACTIVE') NOT NULL DEFAULT 'NOTVERIFIED',
    `area_activityId` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_area_activityId_key`(`area_activityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AreaActivity` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AreaActivity_name_key`(`name`),
    UNIQUE INDEX `AreaActivity_color_key`(`color`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` VARCHAR(191) NOT NULL,
    `zip` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `complement` VARCHAR(191) NULL,
    `district` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `uf` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `contact_type` ENUM('RESIDENTIAL', 'COMMERCIAL') NOT NULL DEFAULT 'RESIDENTIAL',
    `is_default_contact` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Contact_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScheduleType` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ScheduleType_name_key`(`name`),
    UNIQUE INDEX `ScheduleType_icon_key`(`icon`),
    UNIQUE INDEX `ScheduleType_color_key`(`color`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
