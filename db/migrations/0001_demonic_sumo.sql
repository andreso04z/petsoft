PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_pets` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`ownerName` text NOT NULL,
	`imageUrl` text,
	`age` integer NOT NULL,
	`notes` text NOT NULL,
	`updatedAt` integer NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_pets`("id", "name", "ownerName", "imageUrl", "age", "notes", "updatedAt", "createdAt") SELECT "id", "name", "ownerName", "imageUrl", "age", "notes", "updatedAt", "createdAt" FROM `pets`;--> statement-breakpoint
DROP TABLE `pets`;--> statement-breakpoint
ALTER TABLE `__new_pets` RENAME TO `pets`;--> statement-breakpoint
PRAGMA foreign_keys=ON;