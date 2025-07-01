import { Button } from "@/components/ui/button";
import { useState } from "react";
import AppsListModal from "./AppsListModal";

const pricingPlans = [
  {
    name: "PREMIUM",
    description: "Paket pilihan para Hematers",
    originalPrice: "Rp75.000",
    currentPrice: "Rp49.000",
    accessMethod: "Extension Browser",
    services: [
      "ChatGPT PLUS",
      "Netflix",
      "Spotify Premium",
      "Adobe Creative Suite",
      "Microsoft Office 365",
      "Canva Pro",
      "Zoom Pro",
      "Grammarly Premium",
    ],
    featured: false,
  },
  {
    name: "EXCLUSIVE",
    description: "Akses semua fitur premium + ekslusif",
    originalPrice: "Rp150.000",
    currentPrice: "Rp99.000",
    accessMethod: "Direct Credentials",
    services: [
      "Semua dari paket Premium",
      "Exclusive Netflix",
      "YouTube Premium",
      "Disney+ Hotstar",
      "Prime Video",
      "HBO Max",
      "Paramount+",
      "Apple TV+",
      "Coursera Plus",
      "Udemy Business",
      "LinkedIn Learning",
    ],
    featured: true,
  },
  {
    name: "EDUCATION",
    description: "Khusus untuk pelajar dan mahasiswa",
    originalPrice: "Rp100.000",
    currentPrice: "Rp69.000",
    accessMethod: "Extension Browser",
    services: [
      "ChatGPT PLUS",
      "Microsoft Office 365",
      "Adobe Creative Suite",
      "Coursera Plus",
      "Udemy Business",
      "LinkedIn Learning",
      "Grammarly Premium",
      "Notion Pro",
      "Figma Professional",
    ],
    featured: false,
  },
];

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (plan: any) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <section
      id="pricing"
      className="section-spacing bg-gradient-to-br from-card to-background"
    >
      <div className="container-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            APA YANG AKAN ANDA DAPATKAN?
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Pelajari apa saja keunggulan tiap paket sebelum kamu berlangganan!
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`glass-morphism rounded-2xl card-padding relative ${
                plan.featured
                  ? "ring-2 ring-primary scale-105 z-10"
                  : "hover:scale-105"
              } transition-transform duration-300`}
            >
              {/* Featured Badge */}
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-sm font-bold">
                  TERPOPULER
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-300 mb-4">{plan.description}</p>

                {/* Access Method Badge */}
                <div className="mb-6">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                      plan.accessMethod === "Direct Credentials"
                        ? "bg-purple-500/20 border border-purple-500/30 text-purple-300"
                        : "bg-blue-500/20 border border-blue-500/30 text-blue-300"
                    }`}
                  >
                    <span>
                      {plan.accessMethod === "Direct Credentials" ? "🔑" : "🔧"}
                    </span>
                    <span>{plan.accessMethod}</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="text-success line-through text-lg mb-2">
                    {plan.originalPrice}
                  </div>
                  <div className="text-4xl font-bold text-white">
                    {plan.currentPrice}
                    <span className="text-lg text-gray-300 font-normal">
                      /bulan
                    </span>
                  </div>
                </div>
              </div>

              {/* Services List */}
              <div className="mb-8">
                <h4 className="text-white font-semibold mb-4">
                  Yang Anda Dapatkan:
                </h4>
                <div className="space-y-3">
                  {plan.services.map((service, serviceIndex) => (
                    <div
                      key={serviceIndex}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-200 text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => handleViewDetails(plan)}
                >
                  Lihat selengkapnya di sini
                </Button>
                <Button
                  asChild
                  className={`w-full font-semibold ${
                    plan.featured
                      ? "gradient-primary text-white"
                      : "bg-primary hover:bg-primary/90 text-white"
                  }`}
                >
                  <a href={`/payment?plan=${plan.name.toLowerCase()}`}>
                    Mulai Berlangganan
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Apps List Modal */}
      {selectedPlan && (
        <AppsListModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          planName={selectedPlan.name}
          planPrice={selectedPlan.currentPrice}
          accessMethod={selectedPlan.accessMethod}
        />
      )}
    </section>
  );
}
