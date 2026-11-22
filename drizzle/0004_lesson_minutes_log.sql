CREATE TABLE `lesson_minutes` (
	`lesson_number` integer NOT NULL,
	`day` text NOT NULL,
	`minutes` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`lesson_number`, `day`)
);
