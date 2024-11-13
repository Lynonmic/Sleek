import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Navbar = () => {
  return (
    <div>
      <NavbarMenu className="top-0" />
    </div>
  );
};
function NavbarMenu({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Image
          height={100}
          width={100}
          src="https://raw.githubusercontent.com/Lynonmic/Image/main/computer.gif"
          alt="Logo"
          className="object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500"
        />
        <h1 className="text-[36px] text-primary-300 pr-6">Sleek</h1>
        <MenuItem setActive={setActive} active={active} item="Store">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/seo">Hot</HoveredLink>
            <HoveredLink href="/web-dev">Adventure</HoveredLink>
            <HoveredLink href="/interface-design">Inteligence</HoveredLink>
            <HoveredLink href="/branding">Stirmulation</HoveredLink>
          </div>
        </MenuItem>
        <HoveredLink href="#">News</HoveredLink>
        <HoveredLink href="#">FAQ</HoveredLink>
        <HoveredLink href="#">Helps</HoveredLink>
        <HoveredLink href="#">Login</HoveredLink>
      </Menu>
    </div>
  );
}
export default Navbar;
