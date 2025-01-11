import { MobileMenu } from "@/components/ui/mobile-menu";
import NavbarMenu from "@/components/Navbar";

export default async function StorePage() {
  return (
    <div className="bg-neutral-950 dark:bg-neutral-50">
      <NavbarMenu className="absolute top-0 mx-auto hidden md:block" />
      <MobileMenu>
        <div></div>
      </MobileMenu>
    </div>
  );
}
