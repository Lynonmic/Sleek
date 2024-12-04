"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import AnimatedButton from "./ui/animated-button";

const NavbarMenu = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "fixed w-full top-0 inset-x-0 max-w-full mx-auto z-50 ",
        className
      )}
    >
      <Menu setActive={setActive}>
        <div className="flex justify-center">
          <Image
            height={100}
            width={100}
            src="https://raw.githubusercontent.com/Lynonmic/Image/main/computer.gif"
            alt="Logo"
            className="object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500"
          />
          <h1 className="text-[36px] text-primary-300 pr-6">Sleek</h1>
        </div>
        <div className="flex justify-center gap-5 text-xl">
          <MenuItem
            setActive={setActive}
            active={active}
            item="Store"
            linkhref="/store"
          >
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/store">Hot</HoveredLink>
              <HoveredLink href="/">Adventure</HoveredLink>
              <HoveredLink href="/">Inteligence</HoveredLink>
              <HoveredLink href="/">Stirmulation</HoveredLink>
            </div>
          </MenuItem>
          <HoveredLink href="/news">News</HoveredLink>
          <HoveredLink href="#">FAQ</HoveredLink>
          <HoveredLink href="#">Helps</HoveredLink>
        </div>
        <AnimatedButton>Login</AnimatedButton>
      </Menu>
    </div>
  );
};
export default NavbarMenu;
