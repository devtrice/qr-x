import Link from "next/link";
import { Spotlight } from "./ui/Spotlight";
import { Button } from '@/components/Button'

function HeroSection() {
  return (
    <div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
      {/* <Spotlight className="left-0 -top-40 md:left-60 md:-top-20" fill="cyan" /> */}
      <div className="relative z-10 w-full p-4 text-center">
        <h1 className="text-4xl font-extrabold !leading-[5.5rem] tracking-tight text-center text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
        QR Code Generator <br />
        for <span className="font-bold text-primary dark:text-white">High Quality QR Codes </span>
        </h1>
       
        <div className="flex flex-row justify-center mt-4">
        
          
         <div className="mx-2">
         <Button href="/docs" className={'px-4 !font-shan py-2'}>Documentation</Button>
         </div>

          <div className="mx-2">
          <Button href="/contact"  variant='outline'  className={'px-4 py-2'}>Contact</Button>
          </div>
           
            {/* <Button
              borderRadius="1.75rem"
              className="text-black bg-white dark:bg-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              Explore Courses
            </Button> */}
        
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
