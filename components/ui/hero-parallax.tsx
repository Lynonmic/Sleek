"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
interface productProps {
  title: string;
  link: string;
  thumbnail: string;
}

export const HeroParallax = ({ items }: { items: any[] }) => {
  const products: productProps[] = items.map((item) => ({
    title: item.tieude,
    link: item.duongdan,
    thumbnail: item.hinhanh,
  }));
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden 
      antialiased relative flex flex-col self-auto 
      [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div
          className="flex flex-row-reverse 
        space-x-reverse space-x-20 mb-20"
        >
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div
          className="flex flex-row-reverse 
        space-x-reverse space-x-20"
        >
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div
      className="max-w-7xl relative block justify-center items-center 
      md: flex-col mx-auto md:py-40 sm:py-20 py-0 text-base px-2 w-full
     left-0 top-0"
    >
      <h1 className="md:text-7xl text-4xl text-center md:text-left font-bold text-white">
        The Ultimate <br /> Game Storage
      </h1>
      <div className="w-full flex justify-center items-center md:block mt-8">
        <p className=" max-w-[19rem] sm:max-w-xl md:max-w-2xl sm:text-xl text-sm text-white">
          Looking for a one-stop destination for the latest and greatest game
          deals? Our game sale website brings together an extensive collection
          of popular titles across every genre, from blockbuster AAA releases to
          hidden indie gems. Our platform is updated daily, ensuring you get the
          best prices from trusted sources, complete with detailed reviews,
          ratings, and recommendations to help you choose the perfect game.
          Discover a new adventure today and save big on your next favorite
          game!
        </p>
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: productProps;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-[20rem] w-[20rem] sm:h-[30rem] 
      sm:w-[30rem] relative flex-shrink-0 "
    >
      <Link
        href={product.link ?? "/"}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
