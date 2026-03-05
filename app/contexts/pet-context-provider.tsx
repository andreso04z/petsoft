"use client";

import { createContext, useState } from "react";
import { SelectPet } from "@/lib/types";

type PetContextProviderProps = {
  children: React.ReactNode;
  data: SelectPet[];
};

type TPetContext = {
  pets: SelectPet[];
  selectedPetId: string | null;
  selectedPet: SelectPet | undefined;
  numberOfPets: number;
  //handleAddPet: (newPet: Omit<SelectPet, "id">) => void;
  handleEditPet: (petId: string, newPetData: Omit<SelectPet, "id">) => void;
  handleChangeSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data: pets,
}: PetContextProviderProps) {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  /*
  const handleAddPet = (newPet: SelectPet) => {
    // setPets((prev) => [...prev, { id: Date.now().toString(), ...newPet }]);
    addPet(newPet);
  };
  */

  const handleEditPet = (petId: string, newPetData: Omit<SelectPet, "id">) => {
    /*
    setPets((prev) =>
      prev.map((pet) => {
        if (pet.id === petId) {
          return {
            id: petId,
            ...newPetData,
          };
        }
        return pet;
      }),
    );
    */
  };

  const handleCheckoutPet = (id: string) => {
    /*
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
    */
  };

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPet,
        selectedPetId,
        numberOfPets,
        handleEditPet,
        handleCheckoutPet,
        handleChangeSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
