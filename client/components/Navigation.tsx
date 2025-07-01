import { Button } from "@/components/ui/button";

export default function Navigation() {
  return (
    <nav className="w-full flex items-center justify-between py-6 px-6 md:px-20 relative z-20">
      {/* Logo */}
      <div className="flex items-center">
        <h1 className="text-xl md:text-2xl font-bold text-white">
          KlixGenix.ID
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center space-x-8">
        <a
          href="#home"
          className="text-white hover:text-primary transition-colors"
        >
          Beranda
        </a>
        <a
          href="#features"
          className="text-white hover:text-primary transition-colors"
        >
          Fitur
        </a>
        <a
          href="#pricing"
          className="text-white hover:text-primary transition-colors"
        >
          Harga
        </a>
        <a
          href="/faq"
          className="text-white hover:text-primary transition-colors"
        >
          FAQ
        </a>
        <a
          href="/contact"
          className="text-white hover:text-primary transition-colors"
        >
          Kontak
        </a>
      </div>

      {/* Language & Auth */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Language Selector */}
        <div className="hidden sm:flex items-center space-x-2 text-white text-sm">
          <span>����🇩</span>
          <span>ID</span>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <Button
            asChild
            variant="ghost"
            className="text-white hover:bg-white/10 hidden sm:inline-flex"
          >
            <a href="/login">Masuk</a>
          </Button>
          <Button
            asChild
            className="gradient-primary text-white font-medium px-4 md:px-6 text-sm md:text-base"
          >
            <a href="/register">Daftar</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
