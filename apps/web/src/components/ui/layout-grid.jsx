"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useClickAway } from "@uidotdev/usehooks";


export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);

  const ref = useClickAway(() => {
    handleOutsideClick();
  });
  
  const handleClick = (card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {

    setSelected(null);
    setLastSelected(selected);
  
  };

  return (
    <div className="grid w-full h-full grid-cols-1 gap-2 mx-auto md:grid-cols-3 max-w-7xl ">
      {cards.map((card, i) => {
        
        return  <div key={i}  ref={ref} className={cn(card.className, "")}>
        <motion.div
          onClick={() => handleClick(card)}
          className={cn(
            card.className,
            "relative md:h-[26.5rem] !h-[26.5rem] overflow-hidden",
            selected?.id === card.id
              ? "rounded-lg cursor-pointer fixed inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
              : lastSelected?.id === card.id
              ? "z-40  rounded-xl h-full w-full"
              : " rounded-xl h-full w-full"
          )}
          layout
        >
          {selected?.id === card.id && <SelectedCard selected={selected} />}
          <BlurImage card={card} /> 
          
        
        </motion.div>
      </div>
      })}
      <motion.div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleOutsideClick();
        }}
        className={cn(
          "absolute h-full w-full  bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.5 : 0 }}
      />
    </div>
  );
};

const BlurImage = ({ card }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      src={card?.thumbnail}
      height="500"
      width="500"
      
      onLoad={() => setLoaded(true)}
      className={cn(
        "object-cover border-[0.5rem] rounded-md border-white object-top absolute bottom-0 top-0 right-0 left-0  inset-0 h-full w-full transition duration-200",
        loaded ? "blur-none" : "blur-md"
      )}
      alt="thumbnail"
    />
  );
};

const SelectedCard = ({ selected }) => {
  return (
    <div className="bg-transparent absolute top-0 left-0 bottom-0 right-0  h-full w-full flex flex-col justify-end rounded-lg shadow-2xl  z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 top-0 bottom-0 left-0 right-0 z-10 w-full h-full mx-auto bg-black opacity-60"
      />
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative  px-8 pb-4 z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
