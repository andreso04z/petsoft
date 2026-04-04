"use server";

import { db } from "@/db/drizzle";
import { pet } from "@/db/schema";
import { InsertPet } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addPet(newPet: InsertPet) {
    await sleep(3000);
    try {
        await db.insert(pet).values({
            ...newPet,
        });
    } catch (error) {
        return {
            message: "Could not add pet."
        };
    }

    revalidatePath("/app", "layout");
}

export async function editPet(petId: string, updatedPet: InsertPet) {
    await sleep(3000);
    try {
        await db.update(pet).set(updatedPet).where(eq(pet.id, petId));
    } catch (error) {
        return {
            message: "Could not edit pet."
        };
    }

    revalidatePath("/app", "layout");
}

export async function checkoutPet(petId: string) {
    await sleep(3000);
    try {
        await db.delete(pet).where(eq(pet.id, petId));
    } catch (error) {
        return {
            message: "Could not check out pet."
        };
    }

    revalidatePath("/app", "layout");
}