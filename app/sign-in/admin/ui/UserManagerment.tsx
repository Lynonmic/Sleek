import AnimatedButton from "@/components/ui/animated-button";
import { AddingForm } from "@/components/ui/form";
import { cn } from "@/lib/utils";

export function TopElement({ className }: { className: string }) {
  return (
    <>
      <div className={cn("flex justify-end", className)}>
        <AnimatedButton buttonName="Adding">
          <AddingForm className="" />
        </AnimatedButton>
      </div>
    </>
  );
}
