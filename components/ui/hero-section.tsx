import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-12 text-center min-h-[calc(100vh-200px)]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
          The Law Shop
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/home-closing"
            className="bg-black dark:bg-white text-white dark:text-black font-semibold px-8 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 text-lg min-w-[160px]"
          >
            Become a Client
          </Link>
          <Link
            href="/intake"
            className="bg-black dark:bg-white text-white dark:text-black font-semibold px-8 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 text-lg min-w-[160px]"
          >
            Schedule First Consult
          </Link>
        </div>
      </div>
    </section>
  );
}

