CREATE TABLE `pets` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`ownerName` text NOT NULL,
	`imageUrl` text NOT NULL,
	`age` integer NOT NULL,
	`notes` text NOT NULL,
	`updatedAt` integer NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL
);
