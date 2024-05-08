'use client';

import Link from 'next/link'

function ApiCommand({ command }) {

  return (
    <div
      key={command.href}
      className="group relative flex rounded-md bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5"
    >
      <div className="absolute inset-0 rounded-md ring-1 ring-inset ring-zinc-900/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
      <div className="relative rounded-md px-4 pb-4 pt-16">
        <h3 className="mt-4 text-lg font-semibold font-space leading-7 text-blue-500">
          <Link href={`/docs/api/${command.slug}`}>
            <span className="absolute inset-0 rounded-md" />
            {command.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {command.description}
        </p>
        {/* <ul className='flex space-x-2 mt-3'>
          {command.tags.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </ul> */}
      </div>
    </div>
  );
}

export default function ApiCommands({ commands }) {
  return (
    <div className="my-16 xl:max-w-none">
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 dark:border-white/5 sm:grid-cols-3 xl:grid-cols-4">
        {commands.map((command, i) => (
          <ApiCommand key={i} command={command} />
        ))}
      </div>
    </div>
  )
}