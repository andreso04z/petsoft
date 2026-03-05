"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PetForm from "./pet-form";
import { useState } from "react";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  children: React.ReactNode;
  onClick?: () => void;
};

export default function PetButton({
  actionType,
  children,
  onClick,
}: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (actionType === "checkout") {
    return (
      <Button variant="secondary" onClick={onClick}>
        {children}
      </Button>
    );
  }

  if (actionType === "add" || actionType === "edit") {
    return (
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          {actionType === "add" ? (
            <Button size="icon" className="h-12 w-12">
              <PlusIcon className="size-6" strokeWidth={2.5} />
            </Button>
          ) : (
            <Button variant="secondary">{children}</Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            {actionType === "add" ? (
              <>
                <DialogTitle>Add a new pet</DialogTitle>
                <DialogDescription>
                  Please enter the new pet&apos;s information below.
                </DialogDescription>
              </>
            ) : (
              <>
                <DialogTitle>Edit pet</DialogTitle>
                <DialogDescription>
                  Please modify the pet&apos;s information below.
                </DialogDescription>
              </>
            )}
          </DialogHeader>
          <PetForm
            actionType={actionType}
            onFormSubmission={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    );
  }
}
