/* eslint-disable @next/next/no-async-client-component */
"use client";
import Hero from "@/components/Hero";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { MobileMenu } from "@/components/ui/mobile-menu";
import NavbarMenu from "@/components/Navbar";
import { troChoi } from "@/backend/dto/objects";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<troChoi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/testdata", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProducts(data.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(products);
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
