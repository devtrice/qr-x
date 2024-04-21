import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";


export const BentoGrid = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  id,
  className,
  title,
  description,
  header,
  image,
  icon,
}) => {

  const router = useRouter();
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl cursor-pointer group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}

      onClick={() => {
        router.push(`/blog/${id}`)
      }}
    >
    
    <div style={{width: '100%', height: '100%', position: 'relative'}}>
   {header?? <Image
    alt='Mountains'
    src={image}
    layout="fill"
    objectFit="cover"
  />}
</div>
      
      
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-bold font-shan text-neutral-600 dark:text-neutral-200">
          {title}
        </div>
        <div className="text-xs font-normal font-shan text-neutral-600 dark:text-neutral-300" dangerouslySetInnerHTML={{__html: description}} />
       
      </div>
    </div>
  );
};
