"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./sidebar-mobile";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { HoveredLink, Menu, MenuItem } from "./navbar-menu";

export function MobileMenu({ children }: { children?: React.JSX.Element }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "md:hidden rounded-md flex flex-col overflow-hidden md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto focus:outline-none ",
        "h-full"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between">
          <div className="flex flex-col flex-1 ">
            {open ? <Logo /> : <LogoIcon />}
            <Menu setActive={setActive}>
              <MenuItem
                active={active}
                setActive={setActive}
                item="Store"
                linkhref={""}
              >
                <div className="flex flex-col gap-2">
                  <HoveredLink href="/store">Hot</HoveredLink>
                  <HoveredLink href="/">Adventure</HoveredLink>
                  <HoveredLink href="/">Inteligence</HoveredLink>
                  <HoveredLink href="/">Stirmulation</HoveredLink>
                </div>
              </MenuItem>
              <HoveredLink href="/news">News</HoveredLink>
              <HoveredLink href="#">FAQ</HoveredLink>
              <HoveredLink href="#">Helps</HoveredLink>
              <HoveredLink href="#">Login</HoveredLink>
            </Menu>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "/app",
                icon: (
                  <Image
                    src="https://raw.githubusercontent.com/Lynonmic/Image/main/Featured-Image-Blade-X-Release-Date.jpg"
                    className="h-7 w-7 flex-shrink-0 rounded-full "
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/home"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Sleek
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
