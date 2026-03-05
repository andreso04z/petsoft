"use client";

import { usePetContext } from "@/lib/hooks";
import { SelectPet } from "@/lib/types";
import Image from "next/image";
import PetButton from "./pet-button";
import { checkoutPet } from "../actions/actions";
import { useTransition } from "react";

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="h-full w-full flex flex-col">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TopBar pet={selectedPet} />
          <OtherInfo pet={selectedPet} />
          <Notes pet={selectedPet} />
        </>
      )}
    </section>
  );
}

type Props = {
  pet: SelectPet;
};

function TopBar({ pet }: Props) {
  const imageSrc =
    pet.imageUrl ??
    "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png";
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-light">
      <Image
        src={imageSrc}
        alt="Selected pet image"
        height={75}
        width={75}
        className="h-18.75 w-18.75 rounded-full object-cover"
      />
      <h2 className="text-2xl sm:text-3xl font-semibold leading-7 ml-5">
        {pet?.name}
      </h2>
      <div className="flex ml-auto space-x-1 sm:space-x-2">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton
          actionType="checkout"
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
              await checkoutPet(pet.id);
            });
          }}
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
}

function OtherInfo({ pet }: Props) {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.age}</p>
      </div>
    </div>
  );
}

function Notes({ pet }: Props) {
  return (
    <section className="bg-white px-7 py-5 rounded-md mb-9 mx-8 flex-1 border border-light">
      {pet?.notes}
    </section>
  );
}

function EmptyView() {
  return (
    <p className="text-2xl font-medium w-full h-full flex justify-center items-center">
      No pet selected
    </p>
  );
}
