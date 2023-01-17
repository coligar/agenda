-- AlterTable
ALTER TABLE `Curriculo` MODIFY `last_company` VARCHAR(255) NULL,
    MODIFY `last_admission` DATE NULL,
    MODIFY `last_resignation` DATE NULL,
    MODIFY `last_activity` MEDIUMTEXT NULL,
    MODIFY `penultimate_company` VARCHAR(255) NULL,
    MODIFY `penultimate_admission` DATE NULL,
    MODIFY `penultimate_resignation` DATE NULL,
    MODIFY `penultimate_activity` MEDIUMTEXT NULL;
