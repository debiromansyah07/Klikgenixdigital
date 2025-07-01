import { useState } from "react";
import { Button } from "@/components/ui/button";
import { openWhatsAppSupport, openEmailSupport } from "@/lib/support";

const faqTabs = ["Umum", "Langganan"];

const faqData = {
  Umum: [
    {
      question: "Bagaimana cara aksesnya?",
      answer:
        "Setelah berlangganan, Anda akan mendapatkan ekstensi browser khusus yang memungkinkan akses satu klik ke semua aplikasi premium yang tersedia.",
    },
    {
      question: "Apakah aman menggunakan Premium Portal?",
      answer:
        "Ya, sangat aman. Kami menggunakan enkripsi tingkat enterprise dan tidak menyimpan data login pribadi Anda. Semua akses dilakukan melalui sistem proxy yang aman.",
    },
    {
      question: "Berapa lama waktu setup?",
      answer:
        "Setup hanya membutuhkan 5-10 menit. Setelah berlangganan, Anda akan mendapatkan panduan lengkap dan video tutorial untuk instalasi ekstensi.",
    },
    {
      question: "Bisa digunakan di device apa saja?",
      answer:
        "Premium Portal dapat digunakan di semua browser modern (Chrome, Firefox, Safari, Edge) pada Windows, Mac, dan Linux. Mobile support sedang dalam pengembangan.",
    },
    {
      question: "Apakah ada garansi uang kembali?",
      answer:
        "Ya, kami memberikan garansi 7 hari uang kembali tanpa syarat jika Anda tidak puas dengan layanan kami.",
    },
  ],
  Langganan: [
    {
      question: "Bagaimana cara berlangganan?",
      answer:
        "Cukup pilih paket yang sesuai, lakukan pembayaran, dan Anda akan langsung mendapatkan akses ke dashboard serta panduan setup.",
    },
    {
      question: "Metode pembayaran apa saja yang tersedia?",
      answer:
        "Kami menerima transfer bank, e-wallet (OVO, GoPay, DANA), kartu kredit/debit, dan QRIS untuk kemudahan pembayaran.",
    },
    {
      question: "Bisakah upgrade/downgrade paket?",
      answer:
        "Ya, Anda bisa upgrade atau downgrade paket kapan saja. Perbedaan harga akan disesuaikan dengan periode langganan yang tersisa.",
    },
    {
      question: "Apakah ada kontrak jangka panjang?",
      answer:
        "Tidak ada kontrak jangka panjang. Anda bisa berhenti berlangganan kapan saja tanpa biaya penalti.",
    },
    {
      question: "Bagaimana jika ada masalah teknis?",
      answer:
        "Tim support kami siap membantu 24/7 melalui WhatsApp, email, atau live chat. Rata-rata response time kurang dari 2 jam.",
    },
  ],
};

export default function FAQSection() {
  const [activeTab, setActiveTab] = useState("Umum");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="section-spacing bg-gradient-to-br from-card to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>

      <div className="container-padding relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            PERTANYAAN YANG SERING DITANYAKAN
          </h2>
          <p className="text-xl text-gray-200">
            Temukan jawaban untuk pertanyaan yang paling sering ditanyakan
          </p>
        </div>

        {/* FAQ Tabs */}
        <div className="flex justify-center mb-12">
          <div className="glass-morphism rounded-full p-2 flex space-x-2">
            {faqTabs.map((tab) => (
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

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="space-y-4">
            {faqData[activeTab as keyof typeof faqData].map((faq, index) => (
              <div
                key={index}
                className="glass-morphism rounded-xl overflow-hidden"
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
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <div className="glass-morphism rounded-xl p-8 max-w-2xl mx-auto">
            <p className="text-gray-200 mb-6">
              Pertanyaan Anda tidak ada di sini?{" "}
              <span className="text-white font-semibold">
                Tim support kami siap membantu 24/7!
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-8"
                onClick={() =>
                  openWhatsAppSupport(
                    "Halo, saya butuh bantuan dari FAQ section",
                  )
                }
              >
                💬 WhatsApp Support
              </Button>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => openEmailSupport("FAQ Support Request")}
              >
                📧 Email Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
