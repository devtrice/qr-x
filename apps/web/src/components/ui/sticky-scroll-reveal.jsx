"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { Button } from "../Button";
import Image from "next/image";

export const StickyScroll = ({
  content,
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    cardsBreakpoints.forEach((breakpoint, index) => {
      if (latest > breakpoint - 0.2 && latest <= breakpoint) {
        setActiveCard(() => index);
      }
    });
  });

  const backgroundColors = [
    "var(--white)",
    "var(--slate-100)",
    "var(--slate-200)",
  ];

  // const linearGradients = [
  //   "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
  //   "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
  //   "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  // ];

  const linearGradients = [
    "var(--white)",
    "var(--slate-100)",
    "var(--slate-200)",
  ]

  const linearImages = content?.map((data) => {
    return data?.url
  })

  
  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[30rem] dark:!bg-black overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10"
      ref={ref}
    >
      <div className="relative flex items-start px-4 div">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-black dark:text-white"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="max-w-sm mt-10 text-black dark:text-white text-kg"
              >
                {item.description}
              </motion.p>

              <br />

              <Button href={item?.slug} variant="outline" > သိုပ်ႇလူထႅင်ႈ </Button>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      {/* <div
          className="absolute dark:block hidden z-0 inset-0 ml-36 mt-44 h-[357px] max-w-xs blur-[118px] sm:max-w-md md:max-w-lg"
          style={{
            background:
              'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 120.91%)',
          }}
        /> */}
       
      <motion.div
        animate={{
          background: linearGradients[activeCard % linearGradients.length],
        }}
        className="sticky hidden overflow-hidden bg-white rounded-md dark:!bg-black lg:block h-90 w-80 top-10"
      >
      
    
       <Image src={linearImages[activeCard % linearImages.length]} className="w-full h-full" width={120} height={220} layout="fit" />
      

      </motion.div>

      <div
          className="absolute bottom-4 left-[30rem]  inset-0 ml-36 mt-44 h-[357px] max-w-xs blur-[118px] sm:max-w-md md:max-w-lg"
          style={{
            background:
              'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 120.91%)',
          }}
        />
      
    </motion.div>
  );
};
