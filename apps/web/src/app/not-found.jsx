import {Button} from '@/components/Button';
import {HeroPattern} from '@/components/HeroPattern';

export default function NotFound() {
  return (
    <>
      <HeroPattern />
      <div className="flex flex-col items-center justify-center h-full max-w-xl py-16 mx-auto text-center">
        <p className="text-sm font-semibold text-zinc-900 dark:text-white">
          404
        </p>
        <h1 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
          Page not found
        </h1>
        <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Button href="/" arrow="right" className="mt-8">
          Back to docs
        </Button>
      </div>
    </>
  );
}
