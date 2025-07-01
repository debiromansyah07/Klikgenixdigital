import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const steps = [
  {
    title: "Daftar dan buat akun KlixGenix.ID.",
    isActive: true,
  },
  {
    title: "Pilih paket langganan yang cocok untuk Anda.",
    isActive: false,
  },
  {
    title: "Lihat Video Tutorial dan pasang ekstensi pada browser Anda.",
    isActive: false,
  },
  {
    title:
      "Pilih Aplikasi Premium yang ingin Anda akses dengan sekali klik melalui ekstensi KlixGenix.ID.",
    isActive: false,
  },
];

const stepGifs = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
];

export default function StepsSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [currentGif, setCurrentGif] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentGif((prev) => (prev + 1) % stepGifs.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-spacing bg-gradient-to-br from-background to-card">
      <div className="container-padding">
        <div className="flex items-center justify-between gap-16">
          {/* Left Column - Steps */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-white mb-12">
              LANGKAH-LANGKAH PENGGUNAAN KLIXGENIX.ID
            </h2>

            {/* Steps List */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 p-4 rounded-lg transition-all cursor-pointer ${
                    index === activeStep
                      ? "bg-primary/20 border-l-4 border-primary"
                      : "hover:bg-white/5 border-l-4 border-transparent"
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Step Number */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === activeStep
                        ? "bg-primary text-white"
                        : "bg-gray-600 text-gray-300"
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Step Text */}
                  <p
                    className={`text-lg ${
                      index === activeStep
                        ? "text-white font-medium"
                        : "text-gray-300"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Animated Carousel */}
          <div className="flex-1 flex flex-col items-center">
            <div className="glass-morphism rounded-2xl p-8 max-w-md w-full mb-6">
              {/* GIF/Animation Container */}
              <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                {stepGifs.map((gif, index) => (
                  <img
                    key={index}
                    src={gif}
                    alt={`Step ${index + 1} demonstration`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      index === currentGif ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

                {/* Step Indicator Overlay */}
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  Step {currentGif + 1} of {stepGifs.length}
                </div>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center space-x-2">
                {stepGifs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentGif(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentGif ? "bg-primary" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Video Tutorial Button */}
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3 rounded-lg"
            >
              📺 Lihat Video Tutorial
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
