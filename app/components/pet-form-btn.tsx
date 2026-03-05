import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type PetButtonBtnProps = {
  actionType: "add" | "edit";
};

export default function PetButtonBtn({ actionType }: PetButtonBtnProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="mt-5 self-end">
      {actionType === "add" ? "Add a new pet" : "Edit pet"}
    </Button>
  );
}
