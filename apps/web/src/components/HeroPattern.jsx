"use client"

import React from 'react';
import { useTheme } from 'next-themes';
export function HeroPattern() {

  return (
    <div className="absolute inset-0 mx-0 overflow-hidden -z-10 max-w-none">
      <div className="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0880ef] to-[#75b3ff] opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#36b49f]/30 dark:to-[#DBFF75]/30 dark:opacity-100">
         
         
        </div>
        <div className='flex  w-[8.6875rem]  mt-[5rem] md:right-[15rem] right-0 absolute top-[2rem]  justify-center '>
      
  
        </div>
  
      </div>
    </div>
  );
}
