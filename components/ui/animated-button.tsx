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
import Image from "next/image";

export default function AnimatedButton({
  buttonName,
  children,
  AcceptButton,
}: {
  buttonName: string;
  children: React.JSX.Element;
  AcceptButton: string;
}) {
  return (
    <div className="p-0 flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black text-neutral-200 flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            {buttonName}
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-neutral-200 z-20">
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
            <div>{children}</div>
          </ModalContent>
          <ModalFooter className="gap-4">
            <button className="bg-white text-black dark:bg-black dark:text-neutral-200 text-sm px-2 py-1 rounded-md border border-white w-28">
              {AcceptButton}
            </button>
            <CloseButton className="px-2 py-1 bg-black text-neutral-200 dark:bg-black dark:border-black dark:text-neutral-200 border border-black rounded-md text-sm w-28" />
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
