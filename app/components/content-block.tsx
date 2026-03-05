import { cn } from "@/lib/utils";

type ContentBlockProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContentBlock({
  children,
  className,
}: ContentBlockProps) {
  return (
    <div
      className={cn(
        `bg-[#F7F8fA] shadow-sm rounded-md overflow-hidden w-full h-full`,
        className,
      )}
    >
      {children}
    </div>
  );
}
