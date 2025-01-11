import { MobileMenu } from "@/components/ui/mobile-menu";
import NavbarMenu from "@/components/Navbar";
import { CarouselProducts } from "./ui/carousel";

export default async function StorePage() {
  return (
    <div className="bg-neutral-950 dark:bg-neutral-50">
      <NavbarMenu className="absolute top-0 mx-auto hidden md:block" />
      <MobileMenu>
        <div>
          <CarouselProducts className="" header="Adventure" />
          <CarouselProducts className="" header="hot" />
        </div>
      </MobileMenu>
      <CarouselProducts className="hidden md:block" header="Adventure" />
      <CarouselProducts className="hidden md:block mt-0" header="Top" />
    </div>
  );
}
