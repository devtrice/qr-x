'use client'

import React from 'react'
import Image from 'next/image'
import localFont from 'next/font/local'
import clsx from 'clsx'
import {
  ChatBubbleLeftIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline'
import { Button } from './Button'

const koulen = localFont({
  src: '../fonts/Koulen-Regular.ttf',
  display: 'swap',
  variable: '--font-koulen-regular',
  weight: '200 900',
})

export default function SendmePage() {
  const install = `curl -fsSL https://khay.com/sendme.sh | sh`
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(install)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1300)
  }

  return (
    <div
      className={clsx('h-full w-full bg-white text-zinc-700', koulen.variable)}
    >
      <div className="mx-auto pt-10 lg:max-w-5xl">
        <div className="mx-auto mt-20 max-w-5xl text-center">
          <p className="font-koulen text-lg text-zinc-500">
            New to send files? Try
          </p>
          <h1 className="font-koulen text-5xl lg:text-7xl">Sendme</h1>
          <p className="text-lg text-zinc-500">Free. No account required.</p>
        </div>
        <Image
          src="/img/sendme/sendme_hero_1.svg"
          alt="one computer sending files to another computer through a pipe"
          width="1600"
          height="900"
          className="md:-mt-20"
        />

        <div className="mx-5 h-10 border-l border-r shadow-sm md:mx-0 md:-mt-20" />
        <div className="mx-5 border-l border-r border-t shadow-sm md:mx-0">
          <div className="md:flex">
            <div className="border-b px-5 py-10 md:w-5/12 md:border-r">
              <h2 className="font-koulen text-4xl text-zinc-700">
                File transfer
                <br />
                doesn&apos;t need to be complicated
              </h2>
              <p className="mt-1 text-sm/6 text-gray-500">
                It&apos;s like{' '}
                <span className="font-space-mono rounded bg-zinc-100 px-1 py-0.5">
                  scp
                </span>{' '}
                without needing to know the IP address. Add some files to
                sendme, and it will give you a pastable ticket that you can give
                to anyone who needs your files. Sendme will connect your devices
                directly & transfer the data without any accounts or
                configuration.
              </p>
            </div>

            <div className="flex-1 border-b px-5 py-10 md:w-7/12">
              <h3 className="font-koulen text-3xl">Install</h3>
              <p className="mt-1 text-sm/6 text-gray-500">
                Add sendme to your machine using shell:
              </p>
              <button
                className="md:text plausible-event-name=Sendme+Copy+Install+Script+Click mt-2 flex rounded bg-zinc-100 p-2 text-xs"
                onClick={handleCopy}
              >
                <div className="mr-10 grow font-spaceMono">$ {install}</div>
                {copied ? (
                  <span className="mr-1 w-10">copied!</span>
                ) : (
                  <span className="mr-1 w-10"></span>
                )}
                {copied ? (
                  <ClipboardDocumentCheckIcon className="h-5 w-5 text-zinc-500" />
                ) : (
                  <ClipboardDocumentIcon className="h-5 w-5 text-zinc-500" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mx-5 h-5 border-l border-r shadow-sm md:mx-0" />
        <div className="mx-5 border-l border-r border-t shadow-sm md:mx-0">
          <div className="px-5 pt-10">
            <h3 className="font-koulen text-xl text-zinc-600">USING SENDME:</h3>
          </div>
          <div className="border-b sm:gap-5 md:flex">
            <div className="p-5 pb-10 md:w-1/3">
              <div className="relative mb-5 h-40 rounded border border-zinc-300 bg-zinc-100 p-2 py-8">
                <div className="absolute left-0 top-0 flex gap-1 p-2">
                  <div className="h-3 w-3 rounded-full border border-zinc-400" />
                  <div className="h-3 w-3 rounded-full border border-zinc-400" />
                  <div className="h-3 w-3 rounded-full border border-zinc-400" />
                </div>
                <p className="font-mono text-sm font-bold">
                  {'>'} $ sendme send ~/great_photos
                </p>
                <p className="font-mono text-sm text-zinc-400">content added</p>
                <p className="font-mono text-sm text-zinc-400">
                  run sendme receive blobQmFoo...
                </p>
              </div>
              <h3 className="font-koulen text-3xl">1. Setup</h3>
              <p className="mt-1 text-sm/6 text-gray-500">
                pass a file or folder you want to share to sendme. It&apos;ll
                spit out a ticket.
              </p>
            </div>
            <div className="p-5 pb-10 md:w-1/3">
              <div className="relative mb-5 flex h-40 p-2">
                <ChatBubbleLeftIcon className="mr-2 h-6 w-6" />
                <div className="mb-2 h-20 rounded-bl-lg rounded-br-lg rounded-tr-lg border bg-zinc-50 p-2 pb-10">
                  hey here have some great photos: blobQmFoo...
                </div>
              </div>
              <h3 className="font-koulen text-3xl">2. Paste</h3>
              <p className="mt-1 text-sm/6 text-gray-500">
                copy-paste the ticket to your friend.
              </p>
            </div>
            <div className="p-5 pb-10 md:w-1/3">
              <div className="relative mb-5 h-40 rounded border border-zinc-300 bg-zinc-100 p-2 py-8">
                <div className="absolute left-0 top-0 flex gap-1 p-2">
                  <div className="h-3 w-3 rounded-full border border-zinc-400" />
                  <div className="h-3 w-3 rounded-full border border-zinc-400" />
                  <div className="h-3 w-3 rounded-full border border-zinc-400" />
                </div>
                <p className="font-mono text-sm font-bold">
                  {'>'} $ sendme receive blobQmFoo...
                </p>
                <p className="font-mono text-sm text-zinc-400">
                  fetched to great_photos
                </p>
              </div>
              <h3 className="font-koulen text-3xl">3. Download</h3>
              <p className="mt-1 text-sm/6 text-gray-500">
                run get to fetch data directly from your friend.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-5 h-5 border-l border-r shadow-sm md:mx-0" />
        <div className="mx-5 border-l border-r border-t shadow-sm md:mx-0">
          <div>
            <div className="p-5">
              <h3 className="font-koulen text-2xl md:text-3xl">
                Free, for files & folders of any size
              </h3>
              <p className="mt-1 text-sm/6 text-gray-500">
                sendme works by connecting sender and receiver directly, so
                there&apos;s no need to upload to a server, which means no cost!
              </p>
            </div>
            <div className="border-b border-t md:flex">
              <div className="p-5 md:border-r">
                <h3 className="font-koulen text-3xl">Fast</h3>
                <p className="mt-1 text-sm/6 text-gray-500">
                  Sendme can saturate a 4Gbps connection.
                </p>
              </div>
              <div className="p-5 md:border-r">
                <h3 className="font-koulen text-3xl">Resumable fetching</h3>
                <p className="mt-1 text-sm/6 text-gray-500">
                  Interrupted downloads pick up where they left off.
                </p>
              </div>
              <div className="p-5">
                <h3 className="font-koulen text-3xl">Integrity checks</h3>
                <p className="mt-1 text-sm/6 text-gray-500">
                  Data is automatically verified for correctness on both send
                  and receive.
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-t bg-iroh-kv-1 p-5 py-20">
            <h2 className="font-spaceMono text-2xl font-bold">
              Sendme is built on{' '}
              <a href="/" className="text-blue-500">
                iroh
              </a>
            </h2>
            <p className="mt-5 md:max-w-lg">
              Just like{' '}
              <a className="text-blue-500" href="https://dumbpipe.dev">
                dumbpipe
              </a>
              , sendme is built on iroh. Sendme uses iroh{' '}
              <a className="text-irohPurple-700" href="/docs/layers/blobs">
                blobs
              </a>{' '}
              to send and verfiy your files, and{' '}
              <a
                className="text-irohPurple-700"
                href="/docs/layers/connections"
              >
                connections
              </a>{' '}
              to establish direct links between devices for data transfer
            </p>
            <Button
              href="/"
              variant="filled"
              className="plausible-event-name=Sendme+Iroh+CTA+Click mt-5"
            >
              BUILD ON IROH
            </Button>
          </div>
        </div>
        <div className="mx-5 mb-20 h-5 border-l border-r md:mx-0" />
      </div>
    </div>
  )
}
