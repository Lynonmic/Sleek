"use client";
import { cn } from "@/lib/utils";
import Footer from "./footer";
//import { HeroParallax } from "./ui/hero-parallax";
import { Spotlight } from "./ui/Sportlight";

export const Hero = ({
  className,
  children,
}: {
  className?: string;
  children?: React.JSX.Element;
}) => {
  return (
    <div
      className={cn(
        "h-full relative w-full overflow-hidden bg-slate-900 flex flex-col sm:flex-row items-center justify-center rounded-lg ",
        className
      )}
    >
      <Spotlight className="-top-20 left-fit h-[70vh] w-[40vh]" fill="white" />
      <Spotlight className="top-40 left-80 h-[80vh] w-[40vh]" fill="white" />
      <div className="bg-black mb-5">{children}</div>
      <Footer className="mt-0" />
    </div>
  );
};
