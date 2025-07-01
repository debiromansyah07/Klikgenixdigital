import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-white/10">
        <div className="container-padding py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold gradient-text">
              KlixGenix.ID
            </Link>
            <Button asChild variant="ghost" className="text-white">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-padding py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-morphism border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-3xl">
                Syarat & Ketentuan
              </CardTitle>
              <p className="text-gray-300">
                Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
              </p>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <div className="space-y-6 text-gray-200">
                <section>
                  <h2 className="text-xl font-bold text-white mb-3">
                    1. Penerimaan Syarat
                  </h2>
                  <p>
                    Dengan mengakses dan menggunakan layanan KlixGenix.ID, Anda
                    menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika
                    Anda tidak setuju dengan syarat ini, mohon untuk tidak
                    menggunakan layanan kami.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-white mb-3">
                    2. Layanan
                  </h2>
                  <p>
                    KlixGenix.ID menyediakan akses ke berbagai aplikasi premium
                    melalui satu langganan. Kami berhak untuk mengubah,
                    memodifikasi, atau menghentikan layanan kapan saja tanpa
                    pemberitahuan sebelumnya.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-white mb-3">
                    3. Akun Pengguna
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      Anda bertanggung jawab untuk menjaga kerahasiaan akun dan
                      password Anda
                    </li>
                    <li>
                      Anda setuju untuk segera memberitahu kami tentang
                      penggunaan yang tidak sah dari akun Anda
                    </li>
                    <li>
                      Satu akun hanya boleh digunakan oleh satu orang dan tidak
                      boleh dibagi
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-white mb-3">
                    4. Pembayaran dan Pengembalian Dana
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      Pembayaran dilakukan secara bulanan dengan sistem
                      auto-renewal
                    </li>
                    <li>
                      Pengembalian dana dapat dilakukan dalam 7 hari pertama
                      dengan syarat tertentu
                    </li>
                    <li>
                      Harga dapat berubah sewaktu-waktu dengan pemberitahuan 30
                      hari sebelumnya
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-white mb-3">
                    5. Larangan Penggunaan
                  </h2>
                  <p>Anda dilarang untuk:</p>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    <li>Menggunakan layanan untuk tujuan ilegal</li>
                    <li>Membagikan akses akun kepada pihak ketiga</li>
                    <li>Melakukan reverse engineering atau hacking</li>
                    <li>Menggunakan bot atau otomasi yang tidak diizinkan</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-white mb-3">
                    6. Privasi
                  </h2>
                  <p>
                    Penggunaan data pribadi Anda diatur dalam Kebijakan Privasi
                    kami yang merupakan bagian integral dari syarat dan
                    ketentuan ini.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-white mb-3">
                    7. Pembatasan Tanggung Jawab
                  </h2>
                  <p>
                    KlixGenix.ID tidak bertanggung jawab atas kerugian langsung
                    atau tidak langsung yang timbul dari penggunaan layanan
                    kami. Layanan disediakan "sebagaimana adanya" tanpa jaminan
                    apapun.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-white mb-3">
                    8. Perubahan Syarat
                  </h2>
                  <p>
                    Kami berhak mengubah syarat dan ketentuan ini kapan saja.
                    Perubahan akan diberitahukan melalui email atau notifikasi
                    di platform kami.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-white mb-3">
                    9. Kontak
                  </h2>
                  <p>
                    Jika Anda memiliki pertanyaan tentang syarat dan ketentuan
                    ini, silakan hubungi kami di:
                  </p>
                  <ul className="list-none space-y-1 mt-2">
                    <li>Email: support@klixgenix.id</li>
                    <li>WhatsApp: +62 812-3456-7890</li>
                  </ul>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
