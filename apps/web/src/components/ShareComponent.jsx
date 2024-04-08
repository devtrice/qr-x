"use client";
import React from "react";
import {
    FacebookShareButton,
    FacebookIcon,
    ViberShareButton,
    ViberIcon
  } from 'next-share'

export default function ShareComponent({
    url,
    title,
    desc
}) {
  return <div className="flex flex-row pt-2 my-2 gap-x-3">
  <FacebookShareButton
    url={url}
    quote={desc || 'SATTT'}
    title={title}
  >
    <FacebookIcon size={32} round />
  </FacebookShareButton>
  
  <ViberShareButton
    url={url}
    quote={desc || 'SATTT'}
    title={title}
  >
    <ViberIcon size={32} round />
  </ViberShareButton>
  </div>
}


