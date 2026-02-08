import Branding from "@/app/components/branding";
import ContentBlock from "@/app/components/content-block";
import PetDetails from "@/app/components/pet-details";
import PetList from "@/app/components/pet-list";
import SearchForm from "@/app/components/search-form";
import Stats from "@/app/components/stats";

export default function Page() {
  return (
    <main>
      <div className="flex items-center justify-between text-white py-8">
        <Branding />
        <Stats />
      </div>
      <div className="grid md:grid-cols-3 grid-rows-[45px_300px_500px] md:grid-rows-[45px_1fr] gap-4 md:h-150">
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
          <SearchForm />
        </div>
        <div className="md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1">
          <ContentBlock>
            <PetList />
          </ContentBlock>
        </div>
        <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
