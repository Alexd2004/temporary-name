CREATE TABLE `continents` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `continents_name_unique` ON `continents` (`name`);--> statement-breakpoint
CREATE TABLE `countries` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`continent_id` integer NOT NULL,
	FOREIGN KEY (`continent_id`) REFERENCES `continents`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `countries_name_unique` ON `countries` (`name`);--> statement-breakpoint
CREATE TABLE `policies` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`age` text NOT NULL,
	`category_id` integer NOT NULL,
	`email` text NOT NULL,
	`effective_date` text NOT NULL,
	`expiration_date` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`category_id`) REFERENCES `policy_categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `policies_email_unique` ON `policies` (`email`);--> statement-breakpoint
CREATE TABLE `policy_categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `policy_categories_name_unique` ON `policy_categories` (`name`);--> statement-breakpoint
CREATE TABLE `policy_regions` (
	`id` integer PRIMARY KEY NOT NULL,
	`policy_id` integer NOT NULL,
	`country_id` integer,
	`continent_id` integer,
	FOREIGN KEY (`policy_id`) REFERENCES `policies`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`continent_id`) REFERENCES `continents`(`id`) ON UPDATE no action ON DELETE cascade
);
