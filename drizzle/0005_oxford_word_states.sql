CREATE TABLE `oxford_word_states` (
	`entry_key` text PRIMARY KEY NOT NULL,
	`level` text NOT NULL,
	`english` text NOT NULL,
	`bengali` text NOT NULL,
	`saved` integer DEFAULT 0 NOT NULL,
	`known` integer DEFAULT 0 NOT NULL,
	`difficult` integer DEFAULT 0 NOT NULL,
	`mastery` text DEFAULT 'new' NOT NULL,
	`ease` real DEFAULT 2.5 NOT NULL,
	`interval_days` real DEFAULT 0 NOT NULL,
	`repetitions` integer DEFAULT 0 NOT NULL,
	`lapses` integer DEFAULT 0 NOT NULL,
	`next_review_at` integer,
	`last_reviewed_at` integer,
	`note` text DEFAULT '' NOT NULL,
	`created_at` integer,
	`updated_at` integer NOT NULL
);
