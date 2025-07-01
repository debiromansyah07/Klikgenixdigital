export default function IntroductionSection() {
  return (
    <section className="section-spacing bg-gradient-to-br from-background to-card">
      <div className="container-padding">
        <div className="flex items-center justify-between gap-16">
          {/* Left Column - Image */}
          <div className="flex-1">
            <div className="relative">
              <img
                src="/placeholder.svg"
                alt="Premium Portal Dashboard"
                className="w-full max-w-lg rounded-2xl shadow-2xl"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent rounded-full opacity-40"></div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-white mb-8">
              APA ITU KLIXGENIX.ID?
            </h2>

            <div className="space-y-6 text-gray-200 text-lg leading-relaxed">
              <p>
                KlixGenix.ID adalah platform revolusioner yang memberikan akses
                ke lebih dari 50 aplikasi premium dengan satu langganan saja.
                Dari Netflix untuk hiburan, ChatGPT untuk produktivitas, hingga
                software kreatif - semuanya tersedia dalam satu dashboard yang
                mudah digunakan.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                <h3 className="text-white font-semibold text-xl mb-4 flex items-center gap-2">
                  <span>⚡</span> Cara Kerja Platform
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-primary font-medium">
                      📦 Premium & Education
                    </h4>
                    <p className="text-gray-300 text-base">
                      Setelah berlangganan, download extension browser KlixGenix
                      untuk akses mudah ke semua aplikasi premium dengan sekali
                      klik.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-purple-400 font-medium">
                      💎 Exclusive
                    </h4>
                    <p className="text-gray-300 text-base">
                      Dapatkan akses langsung dengan username & password unik
                      untuk setiap aplikasi. Lebih fleksibel, lebih premium.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Dengan teknologi terdepan dan keamanan berlapis, kami memastikan
                pengalaman premium yang aman dan terpercaya untuk semua
                pengguna. Hemat hingga 80% dari biaya langganan individual dan
                nikmati kemudahan akses yang tak tertandingi.
              </p>

              <p>
                Bergabunglah dengan ribuan pengguna yang telah merasakan
                kemudahan dan efisiensi KlixGenix.ID dalam kehidupan digital
                mereka sehari-hari.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
