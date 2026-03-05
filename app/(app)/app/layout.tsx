import AppFooter from "@/app/components/app-footer";
import AppHeader from "@/app/components/app-header";
import BackgroundPattern from "@/app/components/background-pattern";
import { Toaster } from "@/app/components/ui/sonner";
import PetContextProvider from "@/app/contexts/pet-context-provider";
import SearchContextProvider from "@/app/contexts/search-context-provider";
import { db } from "@/db/drizzle";
import { pet } from "@/db/schema";
import { SelectPet } from "@/lib/types";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pets: SelectPet[] = await db.select().from(pet);

  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col max-w-262.5 mx-auto px-4 min-h-screen">
        <AppHeader />
        <PetContextProvider data={pets}>
          <SearchContextProvider>{children}</SearchContextProvider>
        </PetContextProvider>
        <AppFooter />
      </div>
      <Toaster position="top-right" />
    </>
  );
}
