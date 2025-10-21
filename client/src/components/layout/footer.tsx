import { Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 mt-8 border-t border-stone-200">
      <div className="px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          <div className="text-center lg:text-left">
            <div className="text-sm text-stone-600">
              © {currentYear}, made with{" "}
              <Heart className="w-3 h-3 inline-block text-red-500 fill-current" />{" "}
              by{" "}
              <a
                href="https://www.creative-tim.com/?_ga=2.122857986.824184694.1756119169-640723978.1626445283"
                className="font-semibold text-stone-900 hover:text-stone-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Creative Tim
              </a>{" "}
              for a better web.
            </div>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://www.creative-tim.com"
              className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Creative Tim
            </a>
            <a
              href="https://www.creative-tim.com/presentation"
              className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              About Us
            </a>
            <a
              href="https://www.creative-tim.com/blog"
              className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </a>
            <a
              href="https://www.creative-tim.com/license"
              className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              License
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}