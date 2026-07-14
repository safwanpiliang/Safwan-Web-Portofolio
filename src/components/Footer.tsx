export function Footer() {
  return (
    <footer className="w-full bg-slate-900 py-6 sm:py-8 px-4 flex flex-col items-center justify-center border-t border-slate-800">
      <p className="font-inter text-slate-400 text-xs sm:text-sm text-center">
        © {new Date().getFullYear()} Safwan Piliang. All rights reserved.
      </p>
    </footer>
  );
}
