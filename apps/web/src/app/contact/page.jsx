"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

import { Button } from "@/components/Button";
import { Header } from "@/components/Header";

export default function Contact({ settings }) {
  const {
    register,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isEdu, setIsEdu] = useState(false)


  const handleMySubmit = async (event) => {

    event.preventDefault();

    setTimeout(() => {
      setIsSubmit(true);
    }, 2000)
    
    const formData = new FormData(event.target);

    formData.append("access_key", "158b9501-2cf9-440a-bad1-65a70fbc8e48");

    if(isEdu) {
      formData.append("access_key", "5df07b7b-ff23-432e-88a4-6434eab4ed6d");
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if(data) {
      setIsSuccess(true);
      setMessage('Successfully');
      reset();
    }
  }

  return (
    <div className="bg-grid-small-black/[0.2] ">
    <Header />

    <div className="max-w-5xl py-20 mx-auto">
      <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center font-shan text-brand-primary dark:text-white lg:text-4xl lg:leading-snug">
       Contact
      </h1>

     

      <div className="text-center">
        <p className="text-lg font-shan">
           Contact test
        </p>
      </div>


      {isSubmit && isSuccess && (
            <div className="mt-3 text-lg text-center text-green-500 font-shan">
              {"Sent Successfully!"}
            </div>
          )}
       

      <div className="grid px-5 my-10 pb-14 md:px-0 md:pb-4 md:grid-cols-2">
        <div className="my-10">
          <h2 className="text-2xl font-semibold dark:text-white">
           
          </h2>

          <div className="mt-5">
            {/* <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
              <MapPinIcon className="w-4 h-4" />
              <span>1734 Sanfransico, CA 93063</span>
            </div> */}
            {settings?.email && (
              <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
                <EnvelopeIcon className="w-4 h-4" />
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </div>
            )}
            {settings?.phone && (
              <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
                <PhoneIcon className="w-4 h-4" />
                <a href={`tel:${settings.phone}`}>{settings.phone}</a>
              </div>
            )}
          </div>
        </div>
        <div>
          <form onSubmit={handleMySubmit} className="my-10">
            <input
              type="checkbox"
              id=""
              className="hidden"
              style={{ display: "none" }}
              {...register("botcheck")}
            ></input>

           <div className="mb-5">
            </div>

            <div className="mb-5">
              <input
                type="text"
                placeholder="ၸိုဝ်ႈ"
                autoComplete="false"
                className={`w-full font-shan rounded-md border-2 px-4 py-3 outline-none placeholder:text-gray-800 focus:ring-4 dark:bg-gray-900 dark:text-white   dark:placeholder:text-gray-200  ${
                  errors.name
                    ? "border-red-600 ring-red-100 focus:border-red-600 dark:ring-0"
                    : "border-gray-300 ring-gray-100 focus:border-gray-600 dark:border-gray-600 dark:ring-0 dark:focus:border-white"
                }`}
                {...register("name", {
                  required: "ထႅမ်ပၼ် ၸိုဝ်ႈတဵမ်တဵမ်သေၵမ်းၶႃႈ ...",
                  maxLength: 80,
                })}
              />
              {errors.name && (
                <div className="mt-1 text-red-600 font-shan">
                  {/* @ts-ignore */}
                  <small className="font-shan">{errors.name.message}</small>
                </div>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="email_address" className="sr-only font-shan">
                Email Address
              </label>
              <input
                id="email_address"
                type="email"
                placeholder="Email ဢီးမဵဝ်းလ် ၸဝ်ႈၵဝ်ႇ"
                // name="email"
                autoComplete="false"
                className={`w-full font-shan rounded-md border-2 px-4 py-3 outline-none placeholder:text-gray-800 focus:ring-4 dark:bg-gray-900 dark:text-white   dark:placeholder:text-gray-200  ${
                  errors.email
                    ? "border-red-600 ring-red-100 focus:border-red-600 dark:ring-0"
                    : "border-gray-300 ring-gray-100 focus:border-gray-600 dark:border-gray-600 dark:ring-0 dark:focus:border-white"
                }`}
                {...register("email", {
                  required: "ထႅမ်ပၼ် Email သေၵမ်းၶႃႈ ...",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "ထႅမ်ပၼ် Email မႅၼ်းမႅၼ်းသေၵမ်းၶႃႈ ...",
                  },
                })}
              />
              {errors.email && (
                <div className="mt-1 text-red-600 font-shan">
                  {/* @ts-ignore */}
                  <small className="font-shan">{errors.email.message}</small>
                </div>
              )}
            </div>

            <div className="mb-3">
              <textarea
                // name="message"
                placeholder="တႅမ်ႈလွင်ႈတၢင်းဢၼ်ၶႂ်ႈလၢတ်ႈတီႈၼႆႈ ..."
                className={`h-36 w-full font-shan rounded-md border-2 px-4 py-3 outline-none placeholder:text-gray-800   focus:ring-4 dark:bg-gray-900  dark:text-white dark:placeholder:text-gray-200  ${
                  errors.message
                    ? "border-red-600 ring-red-100 focus:border-red-600 dark:ring-0"
                    : "border-gray-300 ring-gray-100 focus:border-gray-600 dark:border-gray-600 dark:ring-0 dark:focus:border-white"
                }`}
                {...register("message", {
                  required: "တႅမ်ႈပၼ်လွင်ႈတၢင်းဢၼ်ၶႂ်ႈလၢတ်ႈသေၵမ်းၶႃႈ ...",
                })}
              />
              {errors.message && (
                <div className="mt-1 text-red-600 font-shan">
                  {" "}
                  {/* @ts-ignore */}
                  <small>{errors.message.message}</small>
                </div>
              )}
            </div>

      
            <Button  disabled={isValid ? false: true} type="submit">
              Submit
            </Button>
          </form>

       
        </div>
      </div>
    </div>
    </div>
   
  );
}
