-- CreateTable
CREATE TABLE `content_items` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `kind` VARCHAR(32) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `excerpt_html` LONGTEXT NULL,
    `content_html` LONGTEXT NULL,
    `featured_image` VARCHAR(1024) NULL,
    `gallery_json` LONGTEXT NULL,
    `specifications_json` LONGTEXT NULL,
    `published_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL,

    INDEX `idx_kind_published_at`(`kind`, `published_at`),
    UNIQUE INDEX `uniq_kind_slug`(`kind`, `slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taxonomies` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `taxonomy` VARCHAR(64) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_taxonomy_name`(`taxonomy`, `name`),
    UNIQUE INDEX `uniq_taxonomy_slug`(`taxonomy`, `slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `content_item_taxonomies` (
    `item_id` INTEGER UNSIGNED NOT NULL,
    `taxonomy_id` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`item_id`, `taxonomy_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_leads` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `form_type` VARCHAR(32) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(64) NULL,
    `company` VARCHAR(191) NULL,
    `message` LONGTEXT NULL,
    `product_interest` LONGTEXT NULL,
    `payload_json` LONGTEXT NULL,
    `status` VARCHAR(32) NOT NULL DEFAULT 'new',
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_contact_leads_form_type`(`form_type`),
    INDEX `idx_contact_leads_created_at`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `roles_json` TEXT NULL,
    `scopes_json` TEXT NULL,
    `last_login_at` DATETIME(0) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `uniq_app_users_email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_user_sessions` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `token_hash` VARCHAR(64) NOT NULL,
    `expires_at` DATETIME(0) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `uniq_app_user_sessions_token_hash`(`token_hash`),
    INDEX `idx_app_user_sessions_user_expired`(`user_id`, `expires_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `drive_projects` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `drive_folder_id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(512) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `uniq_drive_projects_folder`(`drive_folder_id`),
    INDEX `idx_drive_projects_active`(`is_active`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `drive_project_members` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `project_id` BIGINT UNSIGNED NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `can_view` BOOLEAN NOT NULL DEFAULT true,
    `can_download` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    INDEX `idx_drive_project_members_user`(`user_id`),
    UNIQUE INDEX `uniq_drive_project_member`(`project_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance_logs` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `attendance_date` DATE NOT NULL,
    `check_in_at` DATETIME(0) NULL,
    `check_out_at` DATETIME(0) NULL,
    `check_in_ip` VARCHAR(64) NULL,
    `check_out_ip` VARCHAR(64) NULL,
    `check_in_user_agent` VARCHAR(512) NULL,
    `check_out_user_agent` VARCHAR(512) NULL,
    `check_in_lat` DECIMAL(10, 7) NULL,
    `check_in_lng` DECIMAL(10, 7) NULL,
    `check_in_photo_url` VARCHAR(1024) NULL,
    `check_out_lat` DECIMAL(10, 7) NULL,
    `check_out_lng` DECIMAL(10, 7) NULL,
    `check_out_photo_url` VARCHAR(1024) NULL,
    `note` VARCHAR(512) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL,

    INDEX `idx_attendance_logs_date`(`attendance_date`),
    INDEX `idx_attendance_logs_user`(`user_id`),
    UNIQUE INDEX `uniq_attendance_logs_user_date`(`user_id`, `attendance_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance_work_photos` (
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

-- CreateTable
CREATE TABLE `customers` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(64) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `country_code` VARCHAR(8) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `uniq_customers_code`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `factories` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(64) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `uniq_factories_code`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trade_orders` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_no` VARCHAR(64) NOT NULL,
    `customer_id` BIGINT UNSIGNED NOT NULL,
    `factory_id` BIGINT UNSIGNED NULL,
    `sale_owner_user_id` BIGINT UNSIGNED NULL,
    `status` VARCHAR(32) NOT NULL DEFAULT 'draft',
    `due_date` DATE NULL,
    `metadata_json` LONGTEXT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `uniq_trade_orders_order_no`(`order_no`),
    INDEX `idx_trade_orders_customer_id`(`customer_id`),
    INDEX `idx_trade_orders_factory_id`(`factory_id`),
    INDEX `idx_trade_orders_sale_owner`(`sale_owner_user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_logistics` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_id` BIGINT UNSIGNED NOT NULL,
    `etd` DATE NULL,
    `eta` DATE NULL,
    `container_no` VARCHAR(64) NULL,
    `departure_port` VARCHAR(191) NULL,
    `arrival_port` VARCHAR(191) NULL,
    `shipping_line` VARCHAR(191) NULL,
    `vessel_name` VARCHAR(191) NULL,
    `logistics_note` LONGTEXT NULL,
    `updated_by` BIGINT UNSIGNED NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `uniq_order_logistics_order`(`order_id`),
    INDEX `idx_order_logistics_etd`(`etd`),
    INDEX `idx_order_logistics_eta`(`eta`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_work_logs` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_id` BIGINT UNSIGNED NOT NULL,
    `visibility` VARCHAR(32) NOT NULL DEFAULT 'internal',
    `note_type` VARCHAR(64) NOT NULL DEFAULT 'update',
    `message` LONGTEXT NOT NULL,
    `created_by` BIGINT UNSIGNED NULL,
    `updated_by` BIGINT UNSIGNED NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL,

    INDEX `idx_order_work_logs_order`(`order_id`),
    INDEX `idx_order_work_logs_visibility`(`visibility`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trade_order_assignments` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_id` BIGINT UNSIGNED NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `assignment_role` VARCHAR(64) NOT NULL,
    `assigned_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_trade_order_assignments_user`(`user_id`),
    UNIQUE INDEX `uniq_trade_order_assignment`(`order_id`, `user_id`, `assignment_role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_data_items` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_id` BIGINT UNSIGNED NOT NULL,
    `data_type` VARCHAR(64) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `state` VARCHAR(32) NOT NULL DEFAULT 'draft',
    `storage_key` VARCHAR(1024) NULL,
    `metadata_json` LONGTEXT NULL,
    `created_by` BIGINT UNSIGNED NULL,
    `approved_by` BIGINT UNSIGNED NULL,
    `approved_at` DATETIME(0) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL,

    INDEX `idx_order_data_items_order_id`(`order_id`),
    INDEX `idx_order_data_items_state`(`state`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `qc_items` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_id` BIGINT UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `finding_type` VARCHAR(64) NOT NULL DEFAULT 'general',
    `severity` VARCHAR(32) NOT NULL DEFAULT 'major',
    `state` VARCHAR(32) NOT NULL DEFAULT 'pending_review',
    `report_no` VARCHAR(128) NULL,
    `observed_at` DATETIME(0) NULL,
    `metadata_json` LONGTEXT NULL,
    `created_by` BIGINT UNSIGNED NULL,
    `approved_by` BIGINT UNSIGNED NULL,
    `approved_at` DATETIME(0) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL,

    INDEX `idx_qc_items_order_id`(`order_id`),
    INDEX `idx_qc_items_state`(`state`),
    INDEX `idx_qc_items_severity`(`severity`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `capa_items` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_id` BIGINT UNSIGNED NOT NULL,
    `qc_item_id` BIGINT UNSIGNED NULL,
    `title` VARCHAR(255) NOT NULL,
    `root_cause` LONGTEXT NULL,
    `corrective_action` LONGTEXT NULL,
    `preventive_action` LONGTEXT NULL,
    `owner_user_id` BIGINT UNSIGNED NULL,
    `due_date` DATE NULL,
    `state` VARCHAR(32) NOT NULL DEFAULT 'draft',
    `metadata_json` LONGTEXT NULL,
    `created_by` BIGINT UNSIGNED NULL,
    `approved_by` BIGINT UNSIGNED NULL,
    `approved_at` DATETIME(0) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL,

    INDEX `idx_capa_items_order_id`(`order_id`),
    INDEX `idx_capa_items_qc_item_id`(`qc_item_id`),
    INDEX `idx_capa_items_state`(`state`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `factory_surveys` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `factory_id` BIGINT UNSIGNED NOT NULL,
    `survey_code` VARCHAR(64) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `survey_date` DATE NULL,
    `score` DECIMAL(5, 2) NULL,
    `state` VARCHAR(32) NOT NULL DEFAULT 'pending_review',
    `summary` LONGTEXT NULL,
    `metadata_json` LONGTEXT NULL,
    `created_by` BIGINT UNSIGNED NULL,
    `approved_by` BIGINT UNSIGNED NULL,
    `approved_at` DATETIME(0) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `uniq_factory_surveys_code`(`survey_code`),
    INDEX `idx_factory_surveys_factory_id`(`factory_id`),
    INDEX `idx_factory_surveys_state`(`state`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplier_material_items` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `supplier_code` VARCHAR(64) NOT NULL,
    `supplier_name` VARCHAR(191) NOT NULL,
    `material_code` VARCHAR(64) NOT NULL,
    `material_name` VARCHAR(191) NOT NULL,
    `certificate_url` VARCHAR(1024) NULL,
    `quote_url` VARCHAR(1024) NULL,
    `state` VARCHAR(32) NOT NULL DEFAULT 'pending_review',
    `metadata_json` LONGTEXT NULL,
    `created_by` BIGINT UNSIGNED NULL,
    `approved_by` BIGINT UNSIGNED NULL,
    `approved_at` DATETIME(0) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL,

    INDEX `idx_supplier_material_items_state`(`state`),
    INDEX `idx_supplier_material_items_supplier`(`supplier_code`),
    INDEX `idx_supplier_material_items_material`(`material_code`),
    UNIQUE INDEX `uniq_supplier_material_items_key`(`supplier_code`, `material_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `data_share_links` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `data_item_id` BIGINT UNSIGNED NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(0) NULL,
    `created_by` BIGINT UNSIGNED NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `uniq_data_share_links_token`(`token`),
    INDEX `idx_data_share_links_item`(`data_item_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `actor_user_id` BIGINT UNSIGNED NULL,
    `action` VARCHAR(64) NOT NULL,
    `resource` VARCHAR(64) NOT NULL,
    `resource_id` VARCHAR(128) NOT NULL,
    `before_json` LONGTEXT NULL,
    `after_json` LONGTEXT NULL,
    `ip_address` VARCHAR(64) NULL,
    `user_agent` VARCHAR(512) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_audit_logs_actor`(`actor_user_id`),
    INDEX `idx_audit_logs_resource`(`resource`, `resource_id`),
    INDEX `idx_audit_logs_created_at`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recruitment_jobs` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `group_code` VARCHAR(64) NOT NULL,
    `group_title` VARCHAR(191) NOT NULL,
    `group_body` VARCHAR(512) NULL,
    `market_name` VARCHAR(191) NOT NULL,
    `market_status` VARCHAR(32) NOT NULL DEFAULT 'open',
    `title` VARCHAR(191) NOT NULL,
    `summary` VARCHAR(512) NOT NULL,
    `description` LONGTEXT NULL,
    `requirements_json` LONGTEXT NULL,
    `benefits_json` LONGTEXT NULL,
    `location` VARCHAR(191) NULL,
    `work_type` VARCHAR(191) NULL,
    `status` VARCHAR(32) NOT NULL DEFAULT 'open',
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `is_public` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    INDEX `idx_recruitment_jobs_public_status`(`is_public`, `status`),
    INDEX `idx_recruitment_jobs_group_market`(`group_code`, `market_name`),
    INDEX `idx_recruitment_jobs_sort`(`sort_order`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recruitment_applications` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `job_id` BIGINT UNSIGNED NULL,
    `job_title` VARCHAR(191) NULL,
    `career_group` VARCHAR(191) NULL,
    `career_market` VARCHAR(191) NULL,
    `career_status` VARCHAR(64) NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(64) NULL,
    `country_region` VARCHAR(191) NULL,
    `cv_link` VARCHAR(1024) NULL,
    `latest_experience` VARCHAR(512) NULL,
    `message` LONGTEXT NULL,
    `payload_json` LONGTEXT NULL,
    `status` VARCHAR(32) NOT NULL DEFAULT 'new',
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    INDEX `idx_recruitment_applications_job`(`job_id`),
    INDEX `idx_recruitment_applications_status`(`status`),
    INDEX `idx_recruitment_applications_created_at`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `content_item_taxonomies` ADD CONSTRAINT `fk_content_item_taxonomies_item` FOREIGN KEY (`item_id`) REFERENCES `content_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content_item_taxonomies` ADD CONSTRAINT `fk_content_item_taxonomies_taxonomy` FOREIGN KEY (`taxonomy_id`) REFERENCES `taxonomies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `app_user_sessions` ADD CONSTRAINT `fk_app_user_sessions_user` FOREIGN KEY (`user_id`) REFERENCES `app_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drive_project_members` ADD CONSTRAINT `fk_drive_project_members_project` FOREIGN KEY (`project_id`) REFERENCES `drive_projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drive_project_members` ADD CONSTRAINT `fk_drive_project_members_user` FOREIGN KEY (`user_id`) REFERENCES `app_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance_logs` ADD CONSTRAINT `fk_attendance_logs_user` FOREIGN KEY (`user_id`) REFERENCES `app_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance_work_photos` ADD CONSTRAINT `fk_attendance_work_photos_user` FOREIGN KEY (`user_id`) REFERENCES `app_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trade_orders` ADD CONSTRAINT `fk_trade_orders_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trade_orders` ADD CONSTRAINT `fk_trade_orders_factory` FOREIGN KEY (`factory_id`) REFERENCES `factories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trade_orders` ADD CONSTRAINT `fk_trade_orders_sale_owner` FOREIGN KEY (`sale_owner_user_id`) REFERENCES `app_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_logistics` ADD CONSTRAINT `fk_order_logistics_order` FOREIGN KEY (`order_id`) REFERENCES `trade_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_logistics` ADD CONSTRAINT `fk_order_logistics_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `app_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_work_logs` ADD CONSTRAINT `fk_order_work_logs_order` FOREIGN KEY (`order_id`) REFERENCES `trade_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_work_logs` ADD CONSTRAINT `fk_order_work_logs_created_by` FOREIGN KEY (`created_by`) REFERENCES `app_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_work_logs` ADD CONSTRAINT `fk_order_work_logs_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `app_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trade_order_assignments` ADD CONSTRAINT `fk_trade_order_assignments_order` FOREIGN KEY (`order_id`) REFERENCES `trade_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trade_order_assignments` ADD CONSTRAINT `fk_trade_order_assignments_user` FOREIGN KEY (`user_id`) REFERENCES `app_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_data_items` ADD CONSTRAINT `fk_order_data_items_order` FOREIGN KEY (`order_id`) REFERENCES `trade_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_data_items` ADD CONSTRAINT `fk_order_data_items_created_by` FOREIGN KEY (`created_by`) REFERENCES `app_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_data_items` ADD CONSTRAINT `fk_order_data_items_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `app_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `qc_items` ADD CONSTRAINT `fk_qc_items_order` FOREIGN KEY (`order_id`) REFERENCES `trade_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `qc_items` ADD CONSTRAINT `fk_qc_items_created_by` FOREIGN KEY (`created_by`) REFERENCES `app_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `qc_items` ADD CONSTRAINT `fk_qc_items_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `app_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capa_items` ADD CONSTRAINT `fk_capa_items_order` FOREIGN KEY (`order_id`) REFERENCES `trade_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capa_items` ADD CONSTRAINT `fk_capa_items_qc_item` FOREIGN KEY (`qc_item_id`) REFERENCES `qc_items`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capa_items` ADD CONSTRAINT `fk_capa_items_owner` FOREIGN KEY (`owner_user_id`) REFERENCES `app_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capa_items` ADD CONSTRAINT `fk_capa_items_created_by` FOREIGN KEY (`created_by`) REFERENCES `app_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capa_items` ADD CONSTRAINT `fk_capa_items_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `app_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `factory_surveys` ADD CONSTRAINT `fk_factory_surveys_factory` FOREIGN KEY (`factory_id`) REFERENCES `factories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `factory_surveys` ADD CONSTRAINT `fk_factory_surveys_created_by` FOREIGN KEY (`created_by`) REFERENCES `app_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `factory_surveys` ADD CONSTRAINT `fk_factory_surveys_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `app_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_material_items` ADD CONSTRAINT `fk_supplier_material_items_created_by` FOREIGN KEY (`created_by`) REFERENCES `app_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_material_items` ADD CONSTRAINT `fk_supplier_material_items_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `app_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `data_share_links` ADD CONSTRAINT `fk_data_share_links_item` FOREIGN KEY (`data_item_id`) REFERENCES `order_data_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `data_share_links` ADD CONSTRAINT `fk_data_share_links_created_by` FOREIGN KEY (`created_by`) REFERENCES `app_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_logs` ADD CONSTRAINT `fk_audit_logs_actor` FOREIGN KEY (`actor_user_id`) REFERENCES `app_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recruitment_applications` ADD CONSTRAINT `fk_recruitment_applications_job` FOREIGN KEY (`job_id`) REFERENCES `recruitment_jobs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
