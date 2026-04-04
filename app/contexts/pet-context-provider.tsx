"use client";

import { createContext, startTransition, useOptimistic, useState } from "react";
import { InsertPet, SelectPet } from "@/lib/types";
import { toast } from "sonner";
import { addPet, checkoutPet, editPet } from "../actions/actions";

type PetContextProviderProps = {
  children: React.ReactNode;
  data: SelectPet[];
};

type TPetContext = {
  pets: SelectPet[];
  selectedPetId: string | null;
  selectedPet: SelectPet | undefined;
  numberOfPets: number;
  handleAddPet: (petData: InsertPet) => Promise<void>;
  handleEditPet: (petId: string, petData: InsertPet) => Promise<void>;
  handleChangeSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => Promise<void>;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data: pets,
}: PetContextProviderProps) {
  type OptimisticAction =
    | { action: "add"; payload: InsertPet }
    | { action: "edit"; payload: { id: string; petData: InsertPet } }
    | { action: "delete"; payload: string };

  const [optimisticPets, setOptimisticPets] = useOptimistic(
    pets,
    (state, { action, payload }: OptimisticAction) => {
      switch (action) {
        case "add":
          return [
            ...state,
            {
              id: Math.random().toString(),
              name: payload.name,
              ownerName: payload.ownerName,
              imageUrl: payload.imageUrl ?? null,
              age: payload.age,
              notes: payload.notes,
              updatedAt: new Date(),
              createdAt: new Date(),
            },
          ];
        case "edit":
          return state.map((pet) => {
            if (pet.id === payload.id) {
              return {
                ...pet,
                name: payload.petData.name,
                ownerName: payload.petData.ownerName,
                imageUrl: payload.petData.imageUrl ?? pet.imageUrl,
                age: payload.petData.age,
                notes: payload.petData.notes,
              };
            }
            return pet;
          });
        case "delete":
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    },
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  const handleAddPet = async (petData: InsertPet) => {
    startTransition(() => {
      setOptimisticPets({ action: "add", payload: petData });
    });
    const error = await addPet(petData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (petId: string, petData: InsertPet) => {
    startTransition(() => {
      setOptimisticPets({ action: "edit", payload: { id: petId, petData } });
    });
    const error = await editPet(petId, petData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleCheckoutPet = async (petId: string) => {
    startTransition(() => {
      setOptimisticPets({ action: "delete", payload: petId });
    });
    setSelectedPetId(null);
    const error = await checkoutPet(petId);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleChangeSelectedPetId = (petId: string) => {
    setSelectedPetId(petId);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
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
