const features = [
  {
    icon: "🎯",
    title: "50+ Aplikasi Premium",
    description:
      "Dari hiburan sampai produktivitas, semuanya ada di sini! Akses Netflix, ChatGPT, Adobe, dan puluhan aplikasi premium lainnya.",
  },
  {
    icon: "💰",
    title: "Hemat Hingga 80%",
    description:
      "Bandingkan dengan biaya langganan individual. Dengan Premium Portal, Anda hemat jutaan rupiah per tahun!",
  },
  {
    icon: "🔒",
    title: "Keamanan Terjamin",
    description:
      "Sistem keamanan berlapis dan enkripsi tingkat enterprise melindungi data Anda dengan sempurna.",
  },
  {
    icon: "⚡",
    title: "Akses Instan",
    description:
      "Satu klik langsung akses! Tidak perlu repot login berkali-kali atau mengingat banyak password.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="section-spacing bg-gradient-to-br from-card to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="container-padding relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            KENAPA PILIH KLIXGENIX.ID?
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Temukan alasan mengapa ribuan pengguna mempercayai KlixGenix.ID
            sebagai solusi akses premium mereka
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-morphism rounded-2xl card-padding text-center group hover:scale-105 transition-transform duration-300"
            >
              {/* Icon */}
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-200 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
