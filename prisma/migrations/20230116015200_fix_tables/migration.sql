-- DropIndex
DROP INDEX `User_cpf_key` ON `User`;

-- AlterTable
ALTER TABLE `User` MODIFY `cpf` VARCHAR(191) NULL;
