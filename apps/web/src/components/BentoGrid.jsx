"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);


export function BentoGridPage() {

  const { data, error, isLoading } = useSWR('https://dummyjson.com/products', fetcher);

  if (error) return <div>Error loading data...</div>;



  const _data = data?.products;


  console.log("here is _ata::", data);
  
if(isLoading || !data) {
 return  <BentoGrid className="max-w-4xl mx-auto">
  {items?.map((item, i) => (
    <BentoGridItem
      key={i}
      id={item?.id}
    
      header={item.header}
      className={i === 3 || i === 6 ? "md:col-span-2" : ""}
    />
  ))}
</BentoGrid>
}

  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {_data?.map((item, i) => (
        <BentoGridItem
          key={i}
          title={`${item.title?.substring(0,50)}...`}
          id={item?.id}
          description={item.description?.substring(0,60)}
          header={item.header}
          image={item?.thumbnail}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "",
    description: "",
    header: <Skeleton />,
  
  },
  {
    title: "",
    description: "",
    header: <Skeleton />,

  },
  {
    title: "",

    description: "",
    header: <Skeleton />,
   
  },
  {
    title: "",

    description: "",
    header: <Skeleton />,
   
  },
  {
    title: "",
    description: "",
    header: <Skeleton />,
   
  }
  
];
