"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CardFooter } from "./card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Token } from "@/app/dashboard/data/tokenList";

export const HoverEffect = ({
  items,
  className,
}: {
  items: Token[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10", className)}>
      {items.map((item, idx) => (
        <div
          className="group relative group  block p-2 h-full w-full cursor-pointer"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-wheat/[0.2] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card className="  w-full text-center flex flex-col justify-between">
            <div>
              {" "}
              <Image
                src={item.logo_url}
                alt="logo"
                width={50}
                height={50}
                className=" ml-[30%]"
              />
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.symbol}</CardDescription>
            </div>

            <div className=" w-full border-t pt-4 border-wheat group-hover:text-green-400 group-hover:font-bold">BUY</div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border  border-wheat group-hover:border-wheat/[0.2] relative z-20",
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
