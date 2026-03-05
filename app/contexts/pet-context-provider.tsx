"use client";

import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
  handleEditPet: (petId: string, newPetData: Omit<Pet, "id">) => void;
  handleChangeSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  const handleAddPet = (newPet: Omit<Pet, "id">) => {
    setPets((prev) => [...prev, { id: Date.now().toString(), ...newPet }]);
  };

  const handleEditPet = (petId: string, newPetData: Omit<Pet, "id">) => {
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
  };

  const handleCheckoutPet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
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
        handleAddPet,
        handleEditPet,
        handleCheckoutPet,
        handleChangeSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
