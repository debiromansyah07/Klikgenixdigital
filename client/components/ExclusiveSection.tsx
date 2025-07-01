import { useState } from "react";

const tabs = ["PREMIUM", "EXCLUSIVE", "EDUCATION"];

const services = {
  PREMIUM: [
    { name: "ChatGPT PLUS", logo: "🤖" },
    { name: "Netflix", logo: "🎬" },
    { name: "Spotify Premium", logo: "🎵" },
    { name: "Adobe Creative Suite", logo: "🎨" },
    { name: "Microsoft Office 365", logo: "📊" },
    { name: "Canva Pro", logo: "🖼️" },
    { name: "Zoom Pro", logo: "📹" },
    { name: "Grammarly Premium", logo: "✏️" },
  ],
  EXCLUSIVE: [
    { name: "Exclusive Netflix", logo: "🎬" },
    { name: "YouTube Premium", logo: "📺" },
    { name: "Disney+ Hotstar", logo: "🏰" },
    { name: "Prime Video", logo: "📽️" },
    { name: "HBO Max", logo: "🎭" },
    { name: "Paramount+", logo: "⭐" },
    { name: "Apple TV+", logo: "🍎" },
    { name: "Coursera Plus", logo: "🎓" },
    { name: "Udemy Business", logo: "📚" },
    { name: "LinkedIn Learning", logo: "💼" },
    { name: "MasterClass", logo: "👨‍🏫" },
    { name: "Skillshare Premium", logo: "🎨" },
  ],
  EDUCATION: [
    { name: "Coursera Plus", logo: "🎓" },
    { name: "Udemy Business", logo: "📚" },
    { name: "LinkedIn Learning", logo: "💼" },
    { name: "Skillshare Premium", logo: "🎨" },
    { name: "MasterClass", logo: "👨‍🏫" },
    { name: "Notion Pro", logo: "📝" },
    { name: "Figma Professional", logo: "🎯" },
    { name: "Adobe Creative Suite", logo: "🎨" },
  ],
};

export default function ExclusiveSection() {
  const [activeTab, setActiveTab] = useState("EXCLUSIVE");

  return (
    <section className="section-spacing bg-gradient-to-br from-background to-card">
      <div className="container-padding">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="glass-morphism rounded-full p-2 flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {services[activeTab as keyof typeof services].map(
            (service, index) => (
              <div
                key={index}
                className="glass-morphism rounded-xl p-6 text-center group hover:scale-105 transition-transform duration-300"
              >
                {/* Service Logo */}
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {service.logo}
                </div>

                {/* Service Name */}
                <h3 className="text-white font-medium text-sm">
                  {service.name}
                </h3>
              </div>
            ),
          )}
        </div>

        {/* Additional Note for Exclusive */}
        {activeTab === "EXCLUSIVE" && (
          <div className="text-center">
            <p className="text-primary text-xl font-bold mb-4">
              DAN SEMUA YANG ADA PADA PAKET PREMIUM
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-300">
              <span>✓ ChatGPT PLUS</span>
              <span>✓ Netflix</span>
              <span>✓ Spotify Premium</span>
              <span>✓ Adobe Creative Suite</span>
              <span>✓ Dan 40+ layanan lainnya</span>
            </div>
          </div>
        )}

        {/* Additional Note for Education */}
        {activeTab === "EDUCATION" && (
          <div className="text-center">
            <div className="glass-morphism rounded-xl p-6 max-w-2xl mx-auto">
              <h4 className="text-white font-bold text-lg mb-4">
                🎓 Khusus Pelajar & Mahasiswa
              </h4>
              <p className="text-gray-300 text-sm">
                Verifikasi status pelajar/mahasiswa diperlukan. Dapatkan akses
                ke platform pembelajaran terbaik dunia dengan harga khusus.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
