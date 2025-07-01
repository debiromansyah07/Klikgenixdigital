import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center glass-morphism rounded-2xl p-12 max-w-md">
          <div className="text-8xl mb-6">🔍</div>
          <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
          <p className="text-xl text-gray-300 mb-8">
            Halaman yang Anda cari tidak ditemukan
          </p>
          <Button
            asChild
            className="gradient-primary text-white font-medium px-8 py-3"
          >
            <a href="/">Kembali ke Beranda</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
