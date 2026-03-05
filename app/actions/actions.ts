"use server";

import { db } from "@/db/drizzle";
import { pet } from "@/db/schema";
import { InsertPet } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addPet(formData: FormData) {
    try {
        const newPet: InsertPet = {
            name: formData.get("name") as string,
            ownerName: formData.get("ownerName") as string,
            age: Number(formData.get("age") as string),
            imageUrl:
                (formData.get("imageUrl") as string) ||
                "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
            notes: formData.get("notes") as string,
        };
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

export async function editPet(petId: string, formData: FormData) {
    try {
        const updatedPet: InsertPet = {
            name: formData.get("name") as string,
            ownerName: formData.get("ownerName") as string,
            age: Number(formData.get("age") as string),
            imageUrl:
            (formData.get("imageUrl") as string) ||
            "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
            notes: formData.get("notes") as string,
        };
        await db.update(pet).set(updatedPet).where(eq(pet.id, petId));
    } catch (error) {
        return {
            message: "Could not edit pet."
        };
    }

    revalidatePath("/app", "layout");
}

export async function checkoutPet(petId: string) {
    try {
        await db.delete(pet).where(eq(pet.id, petId));
    } catch (error) {
        return {
            message: "Could not check out pet."
        };
    }

    revalidatePath("/app", "layout");
}