"use client";
import React from "react";
import {
  CloseButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./animated-modal";
import { SignupForm } from "./sign-up-form";
import Image from "next/image";

export default function AnimatedButton({ children }: { children: string }) {
  return (
    <div className="p-0 flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            {children}
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            <Image
              src="https://raw.githubusercontent.com/Lynonmic/Image/refs/heads/main/accelerate-svgrepo-com.svg"
              width={30}
              height={30}
              alt={""}
            />
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <div>
              <SignupForm />
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            <CloseButton className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28" />

            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Sign In
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}