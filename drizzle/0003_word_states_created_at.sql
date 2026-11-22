ALTER TABLE `word_states` ADD COLUMN `created_at` integer;
--> statement-breakpoint
UPDATE `word_states` SET `created_at` = COALESCE(`last_reviewed_at`, `updated_at`) WHERE `created_at` IS NULL;
