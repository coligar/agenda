-- AlterTable
ALTER TABLE `Schedule` MODIFY `status` ENUM('ACTIVE', 'RESCHEDULED', 'CANCELED', 'FINISHED', 'WAITING', 'CONFIRMED') NOT NULL DEFAULT 'ACTIVE';
