import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacy() {
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
                Kebijakan Privasi
              </CardTitle>
              <p className="text-gray-300">
                Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
              </p>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <div className="space-y-6 text-gray-200">
                <section>
                  <h2 className="text-xl font-bold text-white mb-3">
                    1. Informasi yang Kami Kumpulkan
                  </h2>
                  <p>Kami mengumpulkan informasi berikut:</p>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    <li>
                      <strong>Informasi Pribadi:</strong> Nama, email, nomor
                      telepon yang Anda berikan saat mendaftar
                    </li>
                    <li>
                      <strong>Data Penggunaan:</strong> Informasi tentang
                      bagaimana Anda menggunakan layanan kami
                    </li>
                    <li>
                      <strong>Data Teknis:</strong> Alamat IP, jenis browser,
                      sistem operasi
                    </li>
                    <li>
                      <strong>Data Pembayaran:</strong> Informasi kartu kredit
                      dan transaksi (diproses melalui penyedia pembayaran yang
                      aman)
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-white mb-3">
                    2. Bagaimana Kami Menggunakan Informasi Anda
                  </h2>
                  <p>Informasi yang kami kumpulkan digunakan untuk:</p>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    <li>Menyediakan dan memelihara layanan kami</li>
                    <li>Memproses pembayaran dan mengelola langganan</li>
                    <li>Berkomunikasi dengan Anda tentang layanan</li>
                    <li>Meningkatkan dan mengoptimalkan layanan kami</li>
                    <li>Mendeteksi dan mencegah aktivitas penipuan</li>
                    <li>Mematuhi kewajiban hukum</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-white mb-3">
                    3. Berbagi Informasi
                  </h2>
                  <p>
                    Kami tidak menjual atau menyewakan informasi pribadi Anda.
                    Kami hanya membagikan informasi dalam situasi berikut:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    <li>
                      Dengan penyedia layanan pihak ketiga yang membantu
                      operasional kami
                    </li>
                    <li>Ketika diwajibkan oleh hukum atau proses hukum</li>
                    <li>
                      Untuk melindungi hak, properti, atau keselamatan kami dan
                      pengguna lain
                    </li>
                    <li>Dalam kasus merger, akuisisi, atau penjualan aset</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-white mb-3">
                    4. Keamanan Data
                  </h2>
                  <p>
                    Kami menerapkan langkah-langkah keamanan teknis dan
                    organisasi untuk melindungi informasi pribadi Anda,
                    termasuk:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    <li>Enkripsi SSL untuk transmisi data</li>
                    <li>Enkripsi database untuk penyimpanan data</li>
                    <li>Akses terbatas ke informasi pribadi</li>
                    <li>Monitoring keamanan 24/7</li>
                    <li>Audit keamanan berkala</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-white mb-3">
                    5. Hak Anda
                  </h2>
                  <p>Anda memiliki hak untuk:</p>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    <li>
                      Mengakses data pribadi yang kami miliki tentang Anda
                    </li>
                    <li>Meminta koreksi data yang tidak akurat</li>
                    <li>Meminta penghapusan data pribadi Anda</li>
                    <li>Membatasi pemrosesan data Anda</li>
                    <li>Mentransfer data Anda ke penyedia layanan lain</li>
                    <li>Menolak pemrosesan data untuk tujuan pemasaran</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-white mb-3">
                    6. Cookies dan Teknologi Pelacakan
                  </h2>
                  <p>Kami menggunakan cookies dan teknologi serupa untuk:</p>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    <li>Mengingat preferensi dan pengaturan Anda</li>
                    <li>Menganalisis penggunaan situs web</li>
                    <li>Menyediakan konten yang dipersonalisasi</li>
                    <li>Meningkatkan keamanan</li>
                  </ul>
                  <p className="mt-2">
                    Anda dapat mengelola preferensi cookie melalui pengaturan
                    browser Anda.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-white mb-3">
                    7. Retensi Data
                  </h2>
                  <p>
                    Kami menyimpan informasi pribadi Anda selama diperlukan
                    untuk menyediakan layanan dan mematuhi kewajiban hukum.
                    Setelah langganan berakhir, data akan dihapus dalam waktu 1
                    tahun, kecuali diwajibkan oleh hukum untuk disimpan lebih
                    lama.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-white mb-3">
                    8. Transfer Data Internasional
                  </h2>
                  <p>
                    Data Anda mungkin diproses dan disimpan di server yang
                    berlokasi di luar Indonesia. Kami memastikan bahwa transfer
                    data tersebut dilakukan dengan perlindungan yang memadai
                    sesuai dengan standar internasional.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-white mb-3">
                    9. Perubahan Kebijakan
                  </h2>
                  <p>
                    Kami dapat memperbarui kebijakan privasi ini dari waktu ke
                    waktu. Perubahan material akan diberitahukan melalui email
                    atau notifikasi di platform kami setidaknya 30 hari
                    sebelumnya.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-white mb-3">
                    10. Kontak
                  </h2>
                  <p>
                    Jika Anda memiliki pertanyaan tentang kebijakan privasi ini
                    atau ingin menggunakan hak-hak Anda, silakan hubungi kami:
                  </p>
                  <ul className="list-none space-y-1 mt-2">
                    <li>Email: privacy@klixgenix.id</li>
                    <li>WhatsApp: +62 812-3456-7890</li>
                    <li>Alamat: KlixGenix.ID, Jakarta, Indonesia</li>
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
