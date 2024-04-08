"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import BackgroundBeams from "@/components/aceternity/BackgroundBeams";

export default function AboutPage({ settings }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(false);


  return (
    <div className="bg-grid-small-black/[0.2] ">
    <Header />

    <div className="max-w-5xl py-20 mx-auto">
      <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center font-shan text-brand-primary dark:text-white lg:text-4xl lg:leading-snug">
       လွင်ႈႁဝ်းၶႃႈ 
      </h1>

      <div className="text-center">
        <p className="text-lg font-shan"> တိုၵ်ႉထႅမ် ၶေႃႈမုၼ်းဝႆႉယူႇၶႃႈ။</p>
      </div>

      <div className="grid px-5 my-10 pb-14 md:px-0 md:pb-4 md:grid-cols-2">
        <div className="my-10">
          <h2 className="text-2xl font-semibold dark:text-white">
             ႁဵၼ်းလိၵ်ႈ လႄႈ ဢီးမဵဝ်းလ်
          </h2>
          <p className="max-w-sm mt-5">
            1. လုမ်းQR X - Devtrice၊ ဝတ်ႉပိတၵၢတ်ႈ၊ ဝဵင်းပၢင်လူင်၊
            <br/>
             Email: ecss.panglong@gmail.com ၊ sattt.panglong@gmail.com
            <br />
            <b> ၽူင်း - 09400467713 </b>
            
          </p>
          <p className="max-w-sm mt-5">
            2. လုမ်းပၢႆးပၺ်ႇၺႃႇ QR X - Devtrice၊ ဝတ်ႉမင်ႇၵလႃႇမူၺ်ႇတေႃႇ၊ ဝဵင်းပၢင်လူင်
            <br />
            Email: ssscec2016@gmail.com
          <br/>
          <b> ၽူင်း - 09899965650</b>

          </p>
          <p className="max-w-sm mt-5">
          3. ၵိင်ႇၽႄ - လုမ်းပၢႆးပၺ်ႇၺႃႇ QR X - Devtrice၊
ၸၼ်ႉၸွမ်ပုတ်ႉထမိူင်းတႆး၊ ဝဵင်းတူၼ်ႈတီး။ 

Email: ssscec2016@gmail.com
<br />
<b>
ၽူင်း - 09784589655
</b>
        
          </p>
        </div>
 
      </div>
    </div>
    </div>
   
  );
}
