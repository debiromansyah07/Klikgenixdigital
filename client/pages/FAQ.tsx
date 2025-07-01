import { useState } from "react";
import { Link } from "react-router-dom";
import { openWhatsAppSupport, openEmailSupport } from "@/lib/support";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const faqData = {
  Umum: [
    {
      question: "Apa itu KlixGenix.ID?",
      answer:
        "KlixGenix.ID adalah platform yang menyediakan akses ke 50+ aplikasi premium dengan satu langganan. Kami menawarkan tiga paket: Premium (extension), Exclusive (direct credentials), dan Education (khusus pelajar).",
    },
    {
      question: "Bagaimana cara menggunakan KlixGenix.ID?",
      answer:
        "Setelah berlangganan, untuk paket Premium dan Education Anda akan mendapatkan extension browser untuk akses mudah. Untuk paket Exclusive, Anda akan mendapatkan username dan password langsung untuk setiap aplikasi.",
    },
    {
      question: "Apakah data saya aman?",
      answer:
        "Ya, sangat aman. Kami menggunakan enkripsi tingkat enterprise dan tidak menyimpan data pribadi Anda. Semua akses dilakukan melalui sistem yang aman dan terenkripsi.",
    },
    {
      question: "Berapa lama setup awal?",
      answer:
        "Setup hanya membutuhkan 5-10 menit. Setelah pembayaran berhasil, Anda akan langsung mendapatkan akses ke dashboard dan panduan lengkap.",
    },
    {
      question: "Apakah bisa digunakan di semua device?",
      answer:
        "Extension tersedia untuk browser Chrome, Firefox, Safari, dan Edge di Windows, Mac, dan Linux. Untuk paket Exclusive, bisa digunakan di semua device karena menggunakan login langsung.",
    },
  ],
  Langganan: [
    {
      question: "Apa perbedaan antara Premium, Exclusive, dan Education?",
      answer:
        "Premium (Rp49.000): Extension browser untuk 50+ apps. Exclusive (Rp99.000): Username/password langsung + apps eksklusif. Education (Rp69.000): Extension + apps khusus pendidikan.",
    },
    {
      question: "Bagaimana cara berlangganan?",
      answer:
        "Pilih paket di halaman pricing, isi data pembayaran, pilih metode pembayaran (kartu kredit, bank transfer, atau e-wallet), dan selesaikan pembayaran.",
    },
    {
      question: "Apakah ada garansi uang kembali?",
      answer:
        "Ya, kami memberikan garansi 7 hari uang kembali tanpa syarat jika Anda tidak puas dengan layanan kami.",
    },
    {
      question: "Bisakah saya upgrade atau downgrade paket?",
      answer:
        "Ya, Anda bisa upgrade atau downgrade kapan saja. Perbedaan harga akan disesuaikan dengan periode langganan yang tersisa.",
    },
    {
      question: "Apakah langganan otomatis diperpanjang?",
      answer:
        "Ya, langganan akan diperpanjang otomatis setiap bulan. Anda bisa membatalkan kapan saja tanpa biaya penalti melalui dashboard.",
    },
  ],
  Teknis: [
    {
      question: "Bagaimana cara install extension?",
      answer:
        "Setelah berlangganan, download file extension dari dashboard, buka Chrome/Firefox Extensions, aktifkan Developer Mode, dan install extension yang sudah didownload.",
    },
    {
      question: "Extension tidak berfungsi, bagaimana?",
      answer:
        "Pastikan browser sudah terupdate, extension sudah aktif, dan coba restart browser. Jika masih bermasalah, hubungi support kami di WhatsApp atau email.",
    },
    {
      question: "Apakah perlu VPN untuk menggunakan layanan ini?",
      answer:
        "Tidak, layanan kami sudah global dan tidak memerlukan VPN. Semua akses sudah dioptimalkan untuk wilayah Indonesia.",
    },
    {
      question: "Bagaimana jika aplikasi tidak bisa diakses?",
      answer:
        "Kami melakukan maintenance rutin untuk memastikan semua aplikasi selalu aktif. Jika ada masalah, akan ada notifikasi di dashboard dan biasanya selesai dalam 1-2 jam.",
    },
    {
      question: "Apakah bisa sharing akun dengan orang lain?",
      answer:
        "Tidak, setiap akun hanya untuk penggunaan personal. Sharing akun melanggar terms of service dan dapat menyebabkan suspend akun.",
    },
  ],
};

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("Umum");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-white/10">
        <div className="container-padding py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold gradient-text">
              KlixGenix.ID
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" className="text-white">
                  ← Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-padding py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300">
              Temukan jawaban untuk pertanyaan yang paling sering ditanyakan
            </p>
          </div>

          {/* FAQ Content */}
          <Card className="glass-morphism border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-2xl">
                🙋‍♂️ Pusat Bantuan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                {/* Tab Navigation */}
                <TabsList className="grid w-full grid-cols-3 glass-morphism mb-8">
                  <TabsTrigger
                    value="Umum"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    Umum
                  </TabsTrigger>
                  <TabsTrigger
                    value="Langganan"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    Langganan
                  </TabsTrigger>
                  <TabsTrigger
                    value="Teknis"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    Teknis
                  </TabsTrigger>
                </TabsList>

                {/* FAQ Content */}
                {Object.entries(faqData).map(([category, faqs]) => (
                  <TabsContent key={category} value={category}>
                    <div className="space-y-4">
                      {faqs.map((faq, index) => (
                        <div
                          key={index}
                          className="glass-morphism rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
                        >
                          <button
                            onClick={() => toggleExpanded(index)}
                            className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                          >
                            <h3 className="text-white font-semibold text-lg pr-4">
                              {faq.question}
                            </h3>
                            <div
                              className={`text-primary text-2xl transition-transform ${
                                expandedIndex === index ? "rotate-45" : ""
                              }`}
                            >
                              +
                            </div>
                          </button>

                          {expandedIndex === index && (
                            <div className="px-6 pb-6">
                              <div className="border-t border-white/10 pt-4">
                                <p className="text-gray-200 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <div className="mt-12">
            <Card className="glass-morphism border-white/10 border-primary/20">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-3">
                  <span className="text-2xl">💬</span>
                  Butuh Bantuan Lebih Lanjut?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">
                  Tim support kami siap membantu Anda 24/7. Hubungi kami
                  melalui:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    onClick={() =>
                      openWhatsAppSupport(
                        "Halo, saya punya pertanyaan dari halaman FAQ",
                      )
                    }
                  >
                    <span>📱</span>
                    WhatsApp Support
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 flex items-center gap-2"
                    onClick={() => openEmailSupport("FAQ Support Request")}
                  >
                    <span>📧</span>
                    Email Support
                  </Button>
                  <Link to="/contact">
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white flex items-center gap-2"
                    >
                      <span>📞</span>
                      Contact Form
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
