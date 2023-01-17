/*
  Warnings:

  - You are about to drop the column `is_default_contact` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `is_default_contact` on the `Phone` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Email` DROP COLUMN `is_default_contact`,
    ADD COLUMN `is_default_email` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Phone` DROP COLUMN `is_default_contact`,
    ADD COLUMN `is_default_phone` BOOLEAN NOT NULL DEFAULT false;
