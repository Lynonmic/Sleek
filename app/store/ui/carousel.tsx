"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "./apple-cards-carousel";
import { cn } from "@/lib/utils";

export function CarouselProducts({
  className,
  header,
}: {
  className: string;
  header: string;
}) {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className={cn("w-full h-[500px] py-20 mt-10", className)}>
      <h6 className="max-w-7xl mx-auto text-sm md:text-2xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        {header}
      </h6>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="200"
              width="100"
              className="md:w-[100px] md:h-[100px] w-64 h-64 mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Artificial Intelligence",
    title: "You can do more with AI.",
    src: "https://raw.githubusercontent.com/Lynonmic/Image/refs/heads/main/accelerate-svgrepo-com.svg",
    content: <DummyContent />,
  },
];
