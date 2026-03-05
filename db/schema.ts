import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { createId } from '@paralleldrive/cuid2'; 

export const pet = sqliteTable("pets", {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    name: text("name").notNull(),
    ownerName: text('ownerName').notNull(),
    imageUrl: text('imageUrl'),
    age: integer('age').notNull(),
    notes: text('notes').notNull(),
    updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
    createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})