"use client";
import React from "react";
import { LayoutGrid } from "./ui/layout-grid";


const SkeletonOne = () => {
  return (
    <div>
      <p className="text-4xl font-bold text-white font-shan">ၶႅပ်းႁၢင်ႈမၢႆတွင်း</p>
      <p className="text-base font-normal text-white"></p>
      <p className="max-w-lg my-4 text-base font-normal font-shan text-neutral-200">
      ၸဝ်ႈသြႃႇလူင် ၺႃၼသမ်ဝရ ဝတ်ႉပိတၵၢတ်ႈ
      </p>
    </div>
  );
};


const SkeletonTwo = () => {
    return (
      <div>
       <p className="text-4xl font-bold text-white font-shan">ၶႅပ်းႁၢင်ႈမၢႆတွင်း</p>
        <p className="text-base font-normal text-white"></p>
        <p className="max-w-lg my-4 text-base font-normal font-shan text-neutral-200">
        ပီၵွၼ်းငိုၼ်း ပၢင်လူင် 18.8.84(1345)
        </p>
      </div>
    );
  };
  const SkeletonThree = () => {
    return (
      <div>
        <p className="text-4xl font-bold text-white font-shan">ၶႅပ်းႁၢင်ႈမၢႆတွင်း</p>
        <p className="text-base font-normal text-white"></p>
        <p className="max-w-lg my-4 text-base font-normal text-neutral-200">
         ပွႆးဢၢပ်ႈၵျွင်း 2013 လႄႈ ပိုတ်ႇၽုၺ်ႇလုမ်းသင်ႇၶ
        </p>
      </div>
    );
  };
 
  const SkeletonFour = () => {
    return (
      <div>
        <p className="text-4xl font-bold text-white font-shan">ၶႅပ်းႁၢင်ႈမၢႆတွင်း</p>
        <p className="text-base font-normal text-white"></p>
        <p className="max-w-lg my-4 text-base font-normal text-neutral-200">
         
        ပၢင်ၵုမ်လူင် သင်ႇၶမႁႃႇသၼ်ၼိပႃတ ၶွပ်ႈၶူပ်ႇသီႇပီ ပွၵ်ႈၵမ်း(15)
        15-17/05/2023
        </p>
      </div>
    );
  };
  

const data1 = Array.from({ length: 405 }, (_, index) => index + 2);

const data2= Array.from({ length: 552 }, (_, index) => index + 490);

const data3= Array.from({ length: 626 }, (_, index) => index + 560);

const data4= Array.from({ length: 741 }, (_, index) => index + 700);

// Array of numbers to remove
const numbersToRemove = [4, 17, 76];

const numbersToRemove2 = [];

const numbersToRemove3 = [629,627,628,630,634,645,636,637,638,639,640,641,642,643,644];
const numbersToRemove4 = [];

 const formatData = data1?.filter(num => !numbersToRemove.includes(num));

 const formatData2 = data2?.filter(num => !numbersToRemove2.includes(num));

 const formatData3 = data3?.filter(num => !numbersToRemove3.includes(num));
 
 const formatData4 = data4?.filter(num => !numbersToRemove4.includes(num));


const _cards1 = formatData?.map((_data, i) =>  {
   
  return {
   id: _data,
   content: <SkeletonOne />,
   className: i % 3 === 0 ? "md:col-span-2": "col-span-1",
   thumbnail: `https://sattt.sgp1.cdn.digitaloceanspaces.com/the-most-ven-nyanawasa/img${_data?.toString().padStart(3, '0')}.jpg`,
 }
})
const _cards2 = formatData2?.map((_data, i) =>  {
   
    return {
     id: _data,
     content: <SkeletonTwo />,
     className: i % 3 === 0 ? "md:col-span-2": "col-span-1",
     
     thumbnail: `https://sattt.sgp1.cdn.digitaloceanspaces.com/75piguanngung/img${_data?.toString().padStart(3, '0')}.jpg`,
   }
  })

  const _cards3 = formatData3?.map((_data, i) =>  {
   
    return {
     id: _data,
     content: <SkeletonThree />,
     className: i % 3 === 0 ? "md:col-span-2": "col-span-1",
     thumbnail: `https://sattt.sgp1.cdn.digitaloceanspaces.com/memo-2013/img${_data?.toString().padStart(3, '0')}.jpg`,
   }
  })

  const _cards4 = formatData4?.map((_data, i) =>  {
   
    return {
     id: _data,
     content: <SkeletonFour />,
     className: i % 3 === 0 ? "md:col-span-2": "col-span-1",
     thumbnail: `https://sattt.sgp1.cdn.digitaloceanspaces.com/meeting-2023/image-${_data?.toString().padStart(3, '0')}.jpeg`,
   }
  })

export function LayoutGridPage() {
  return (
    <div className="relative w-full h-screen pb-20">
      <LayoutGrid cards={_cards1} />
    </div>
  );
}

export function LayoutGrid2Page() {
    return (
        <div className="relative w-full h-full pb-20 ">
        <LayoutGrid cards={_cards2} />
      </div>
    );
  }

  export function LayoutGrid3Page() {
    return (
      <div className="relative w-full h-full pb-20">
        <LayoutGrid cards={_cards3} />
      </div>
    );
  }


  export function LayoutGrid4Page() {
    return (
      <div className="relative w-full h-full pb-20">
        <LayoutGrid cards={_cards4} />
      </div>
    );
  }











