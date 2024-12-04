/* eslint-disable @next/next/no-async-client-component */
import Hero from "@/components/Hero";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { MobileMenu } from "@/components/ui/mobile-menu";
import NavbarMenu from "@/components/Navbar";
import { getAllData } from "@/lib/postgres";

export default async function Home() {
  const tableName = "trochoi";
  const products = await getAllData({ tableName });

  return (
    <>
      <NavbarMenu className="absolute top-0 mx-auto hidden md:block" />
      <MobileMenu>
        <Hero>
          <HeroParallax items={products} />
        </Hero>
      </MobileMenu>
      <Hero className="hidden md:block">
        <HeroParallax items={products} />
      </Hero>
    </>
  );
}
