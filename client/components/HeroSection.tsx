import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const carouselImages = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-bg min-h-screen flex flex-col">
      {/* Hero Content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-between px-6 md:px-20 py-16 gap-12">
        {/* Left Column - Text Content */}
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="gradient-text">
              Akses 50+ Premium Apps mulai dari Rp49.000
            </span>
          </h1>

          <h2 className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            Nikmati Netflix, ChatGPT, dan 50+ layanan premium lainnya hanya
            dengan satu langganan.
          </h2>

          <Button
            asChild
            size="lg"
            className="gradient-primary text-white font-semibold px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-lg hover:scale-105 transition-transform"
          >
            <a href="#pricing">Mulai Sekarang, Cuma 49rb/Bulan</a>
          </Button>
        </div>

        {/* Right Column - Carousel */}
        <div className="flex-1 flex justify-center items-center w-full lg:w-auto">
          <div className="glass-morphism rounded-2xl p-6 md:p-8 max-w-md w-full">
            {/* Carousel Container */}
            <div className="relative h-48 md:h-64 rounded-lg overflow-hidden mb-4 group">
              {carouselImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Premium app ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 transform ${
                    index === currentImage
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                />
              ))}

              {/* Carousel Controls */}
              <button
                onClick={() =>
                  setCurrentImage((prev) =>
                    prev === 0 ? carouselImages.length - 1 : prev - 1,
                  )
                }
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors text-2xl"
              >
                ‹
              </button>
              <button
                onClick={() =>
                  setCurrentImage((prev) => (prev + 1) % carouselImages.length)
                }
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors text-2xl"
              >
                ›
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImage ? "bg-primary" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
