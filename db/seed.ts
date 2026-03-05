import { db, sqlite } from "./drizzle";
import { pet } from "./schema";

const petsArray = [
    {
        name: "Benjamin",
        ownerName: "John Doe",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-4.png",
        age: 2,
        notes: "Doesn't like to be touched on the belly. Plays well with other dogs.",
    },
    {
        name: "Richard",
        ownerName: "Josephine Dane",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-5.png",
        age: 5,
        notes: "Needs medication twice a day.",
    },
    {
        name: "Anna",
        ownerName: "Frank Doe",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-6.png",
        age: 4,
        notes: "Allergic to chicken.",
    },
]

async function main() {
    console.log(`Start seeding...`);
    for (const petData of petsArray) {
        const [ result ] = await db.insert(pet).values(petData).returning();
        console.log(`Created pet with id: ${result.id}`);
    }
    console.log(`Seeding finished.`);
}

main().then(() => {
    sqlite.close();
    console.log('Database connection closed.');
}).catch(async (e) => {
    console.error(e);
    sqlite.close();
    process.exit(1);
});