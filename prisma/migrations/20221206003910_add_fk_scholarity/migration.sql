-- AlterTable
ALTER TABLE `User` ADD COLUMN `scholarity_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `User_scholarity_id_idx` ON `User`(`scholarity_id`);
