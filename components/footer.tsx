import { cn } from "@/lib/utils";
import React from "react";

const Footer = ({ className }: { className: string }) => {
  return (
    <div className={cn("relative grid grid-cols-3 p-10 text-white", className)}>
      <div>
        <ul className="flex flex-col md:flex-row flex-1 justify-between">
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/services">Services</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
      <div className="flex flex-col md:flex-row flex-1 justify-between">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms">Terms & Conditions</a>
        <a href="/accessibility">Accessibility</a>
      </div>
      <div className="flex flex-col md:flex-row flex-1 justify-evenly">
        <a href="https://facebook.com">Facebook</a>
        <a href="https://twitter.com">Twitter</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>
    </div>
  );
};

export default Footer;
