import { MobileMenu } from "@/components/ui/mobile-menu";
import NavbarMenu from "@/components/Navbar";
import { CarouselProducts } from "./ui/carousel";

export default async function StorePage() {
  return (
    <>
      <NavbarMenu className="absolute top-0 mx-auto hidden md:block" />
      <MobileMenu>
        <CarouselProducts className="" header="hot" />
      </MobileMenu>
      <CarouselProducts className="hidden md:block" header="Adventure" />
      <CarouselProducts className="hidden md:block mt-0" header="Top" />
    </>
  );
}
