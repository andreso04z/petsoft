import { pet } from "@/db/schema";

/*export type Pet = {
  id: string;
  name: string;
  ownerName: string;
  imageUrl?: string;
  age: number;
  notes: string;
};*/

export type SelectPet = typeof pet.$inferSelect;
export type InsertPet = typeof pet.$inferInsert;