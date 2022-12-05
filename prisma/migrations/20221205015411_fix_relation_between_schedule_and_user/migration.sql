-- DropIndex
DROP INDEX `Schedule_userId_key` ON `Schedule`;

-- CreateIndex
CREATE INDEX `Schedule_userId_idx` ON `Schedule`(`userId`);
