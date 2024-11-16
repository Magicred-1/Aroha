"use client"
import { useState } from "react";
import Image from "next/image";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "./animated-modal";
import { AnimatedGridPattern } from "./animatedGridPattern";
import { CardFooter } from "./card";
import { CardSpotlight } from "./card-spotlight";
import BuyForm from "@/app/invest/components/BuyForm";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import ShinyButton from "./shiny-button";
import { Button } from "./button";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    logo: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const ActionButton = ({ children }: { children: React.ReactNode }) => (
    <ModalTrigger
      className="px-4 py-2 text-sm bg-black/30 hover:bg-wheat 
      border border-wheat/20 hover:border-wheat/40 rounded-full transition-all duration-200 
      text-white dark:text-white/90 flex-1 text-center"
    >
      {children}
      </ModalTrigger>
);

  return (
    <div className={cn("lg:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 flex-wrap gap-10 py-3", className)}>
      {items.map((item, idx) => (
        <Modal key={idx}>
          <div
            className="relative group block pY-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <CardSpotlight className=" min-h-[400px] w-[280px] text-center flex flex-col justify-between rounded-xl border-wheat/30">
              <div className="z-10 flex-1">
                <div className="flex justify-center mb-4">
                  <Image src={item.logo} alt="logo" width={50} height={50} />
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </div>

              <div className="w-full border-t border-wheat/30 pt-4 mt-4 px-4 z-10">
                <div className=" w-full flex flex-col gap-2 justify-between">
                  <ActionButton >Buy</ActionButton>
                  <ActionButton >Buy & Lend</ActionButton>
                  <ActionButton >Buy & LP</ActionButton>
                </div>
              </div>
            </CardSpotlight>
          </div>

          <ModalBody className="border-wheat/45">
            <ModalContent className="bg-gradient-to-l from-gray-900 to-black">
              <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.05}
                duration={3}
                repeatDelay={1}
                className={cn(
                  "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
                  "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                  "absolute pointer-events-none bg-opacity-20",
                )}
              />
              <BuyForm />
            </ModalContent>
          </ModalBody>
        </Modal>
      ))}
    </div>
  );
};

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-wheat group-hover:border-wheat/[0.2] relative z-20",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>{children}</h4>;
};

export const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <p className={cn("mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>{children}</p>;
};

export default HoverEffect;
