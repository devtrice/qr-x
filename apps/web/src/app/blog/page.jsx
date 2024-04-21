
import { BentoGridPage } from "@/components/BentoGrid";
import { Header } from "@/components/Header";

export default function AboutPage({ settings }) {

  return (
    <div className="bg-grid-small-black/[0.1] ">
    <Header />
    <div className="max-w-5xl py-20 mx-auto">
      <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center font-shan text-brand-primary dark:text-white lg:text-4xl lg:leading-snug">
       Blog
      </h1>

      <BentoGridPage />
    </div>
    </div>
   
  );
}
