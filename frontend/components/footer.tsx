export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 bg-white py-12 dark:border-gray-800 dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} JetLog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
