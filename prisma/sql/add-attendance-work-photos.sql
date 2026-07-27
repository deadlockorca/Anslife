CREATE TABLE IF NOT EXISTS `attendance_work_photos` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `attendance_date` DATE NOT NULL,
    `drive_file_id` VARCHAR(191) NOT NULL,
    `drive_parent_id` VARCHAR(191) NOT NULL,
    `drive_web_view_link` VARCHAR(1024) NULL,
    `file_name` VARCHAR(255) NOT NULL,
    `original_file_name` VARCHAR(255) NULL,
    `mime_type` VARCHAR(191) NOT NULL,
    `file_size` BIGINT UNSIGNED NULL,
    `uploaded_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_attendance_work_photos_date`(`attendance_date`),
    INDEX `idx_attendance_work_photos_user_date`(`user_id`, `attendance_date`),
    INDEX `idx_attendance_work_photos_drive_file`(`drive_file_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `attendance_work_photos`
  ADD CONSTRAINT `fk_attendance_work_photos_user`
  FOREIGN KEY (`user_id`) REFERENCES `app_users`(`id`)
  ON DELETE CASCADE ON UPDATE CASCADE;
