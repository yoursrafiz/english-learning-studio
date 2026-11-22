CREATE TABLE IF NOT EXISTS `phrasal_translations` (
	`entry_key` text PRIMARY KEY NOT NULL,
	`meaning_bn` text DEFAULT '' NOT NULL,
	`example_bn` text DEFAULT '' NOT NULL,
	`created_at` integer NOT NULL
);
