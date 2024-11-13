"use client";
import Navbar from "./Navbar";
import { HeroParallax } from "./ui/hero-parallax";
import { Spotlight } from "./ui/Sportlight";
const Hero = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <div
        className="h-full relative w-full overflow-hidden
       bg-slate-900 flex flex-col items-center justify-center 
       rounded-lg lg"
      >
        <Spotlight
          className="-top-20 left-fit h-[70vh] w-[40vh]"
          fill="white"
        />
        <Spotlight className="top-40 left-80 h-[80vh] w-[40vh]" fill="white" />
        <div className="bg-black">
          <HeroParallax products={products} />
        </div>
      </div>
      <div></div>
    </div>
  );
};
export const products = [
  {
    title: "Blade-X",
    link: "https://yeehagames.com/game/337",
    thumbnail:
      "https://raw.githubusercontent.com/Lynonmic/Image/main/Featured-Image-Blade-X-Release-Date.jpg",
  },
  {
    title: "Fornite",
    link: "https://www.fortnite.com/?lang=en-US",
    thumbnail:
      "https://raw.githubusercontent.com/Lynonmic/Image/main/fornite.png",
  },
  {
    title: "Genshin",
    link: "https://genshin.hoyoverse.com/en/",
    thumbnail:
      "https://raw.githubusercontent.com/Lynonmic/Image/main/GFX%20Fan%20Poster%20-%20Arlecchino%20(The%20Knave,%20Fatui%20Harbinger%20No_4).jpg",
  },

  {
    title: "LEOMORD ABYSS",
    link: "https://www.mobilelegends.com/",
    thumbnail:
      "https://raw.githubusercontent.com/Lynonmic/Image/main/LEOMORD%20ABYSS.jpg",
  },
  {
    title: "Among Us",
    link: "https://www.innersloth.com/games/among-us/",
    thumbnail:
      "https://raw.githubusercontent.com/Lynonmic/Image/main/AmongUs.png",
  },
  {
    title: "Minecraft",
    link: "https://www.minecraft.net/en-us",
    thumbnail:
      "https://raw.githubusercontent.com/Lynonmic/Image/main/minecraft.png",
  },

  {
    title: "Over Watch 2",
    link: "https://overwatch.blizzard.com/en-gb/",
    thumbnail:
      "https://raw.githubusercontent.com/Lynonmic/Image/main/Blizzard.png",
  },
  {
    title: "Call of Duty  ",
    link: "https://www.callofduty.com/",
    thumbnail:
      "https://raw.githubusercontent.com/Lynonmic/Image/main/Call_Of_Duty.png",
  },
  {
    title: "Cyberpunk",
    link: "https://www.cyberpunk.net/vn/en/",
    thumbnail:
      "https://raw.githubusercontent.com/Lynonmic/Image/main/Cyberpunk.png",
  },
  {
    title: "Elder Scroll",
    link: "https://www.elderscrollsonline.com/en-us/home",
    thumbnail:
      "https://raw.githubusercontent.com/Lynonmic/Image/main/ElderScroll.png",
  },
  {
    title: "League of Lengends",
    link: "https://www.leagueoflegends.com/vi-vn/",
    thumbnail: "https://raw.githubusercontent.com/Lynonmic/Image/main/LOL.png",
  },

  {
    title: "Blade X Lord",
    link: "https://www.pocketgamer.com/blade-xlord/blade-xlords-battle-system-and-strategies-explained-in-depth/",
    thumbnail:
      "https://raw.githubusercontent.com/Lynonmic/Image/main/blade-x-lord-feature.jpg",
  },
  {
    title: "PUBG",
    link: "https://www.pubg.com/en",
    thumbnail: "https://raw.githubusercontent.com/Lynonmic/Image/main/pubg.png",
  },
  {
    title: "Destiny 2",
    link: "https://www.bungie.net/7",
    thumbnail:
      "https://raw.githubusercontent.com/Lynonmic/Image/main/Destiny%202.png",
  },
  {
    title: "Fall Guy",
    link: "https://www.fallguys.com/en-US",
    thumbnail:
      "https://raw.githubusercontent.com/Lynonmic/Image/main/FallGuy.png",
  },
];
export default Hero;
