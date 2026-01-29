import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-black/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              IT 112
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            Services
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4"></div>
      </div>
    </header>
  );
}
