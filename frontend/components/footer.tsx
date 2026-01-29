import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 bg-white py-12 dark:border-gray-800 dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">IT 112</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Building aesthetic and functional web experiences.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-50">Features</Link></li>
              <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-50">Pricing</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-50">About</Link></li>
              <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-50">Careers</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-50">Privacy</Link></li>
              <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-50">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-100 pt-8 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} IT 112 Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
