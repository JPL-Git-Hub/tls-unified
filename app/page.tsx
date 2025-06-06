import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-inter)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-[36px] leading-tight font-bold">The Law Shop</div>
        <ol className="list-inside list-decimal text-xl text-center sm:text-left">
          <li className="mb-3 tracking-[-.01em]">
            Professional legal services with modern convenience
          </li>
          <li className="tracking-[-.01em]">Expert legal help when you need it</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-lg sm:text-xl h-12 sm:h-14 px-5 sm:px-6 sm:w-auto"
            href="/home-closing"
          >
            Become a Client
          </Link>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-lg sm:text-xl h-12 sm:h-14 px-5 sm:px-6 w-full sm:w-auto"
            href="/intake"
          >
            Schedule First Consult
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[32px] flex-wrap items-center justify-center">
        <Link
          className="flex items-center gap-3 hover:underline hover:underline-offset-4 text-lg"
          href="/home-closing"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={20} height={20} />
          Home Closing
        </Link>
        <Link
          className="flex items-center gap-3 hover:underline hover:underline-offset-4 text-lg"
          href="/portal"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={20} height={20} />
          Client Portal
        </Link>
        <Link
          className="flex items-center gap-3 hover:underline hover:underline-offset-4 text-lg"
          href="/intake"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={20} height={20} />
          Schedule Consultation
        </Link>
      </footer>
    </div>
  );
}