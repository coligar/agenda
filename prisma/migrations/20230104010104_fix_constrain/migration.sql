-- DropIndex
DROP INDEX `Schedule_area_activityId_key` ON `Schedule`;

-- DropIndex
DROP INDEX `Schedule_schedule_typeId_key` ON `Schedule`;

-- CreateIndex
CREATE INDEX `Schedule_schedule_typeId_idx` ON `Schedule`(`schedule_typeId`);

-- CreateIndex
CREATE INDEX `Schedule_area_activityId_idx` ON `Schedule`(`area_activityId`);
