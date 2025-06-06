import Link from 'next/link';

export function Header() {
  return (
    <header className="flex items-center justify-between p-6 lg:px-8">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-black dark:bg-white rounded-md flex items-center justify-center">
          <span className="text-white dark:text-black font-bold text-sm">TLS</span>
        </div>
        <span className="font-semibold text-gray-900 dark:text-white">The Law Shop</span>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
          About
        </Link>
        <Link href="/services" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
          Services
        </Link>
        <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
          Contact
        </Link>
      </nav>
    </header>
  );
}

