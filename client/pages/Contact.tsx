import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  openWhatsAppSupport,
  openEmailSupport,
  openLiveChat,
} from "@/lib/support";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Pesan Terkirim!",
        description:
          "Terima kasih atas pesan Anda. Tim support kami akan merespons dalam 24 jam.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
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
            <h1 className="text-4xl font-bold text-white mb-4">Hubungi Kami</h1>
            <p className="text-xl text-gray-300">
              Tim support kami siap membantu Anda 24/7
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="glass-morphism border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center gap-3">
                  <span className="text-2xl">📝</span>
                  Kirim Pesan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Nama Lengkap
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama lengkap"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@email.com"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white">
                      Subjek
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Apa yang bisa kami bantu?"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">
                      Pesan
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Jelaskan masalah atau pertanyaan Anda..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[120px]"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full gradient-primary text-white font-semibold py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Methods */}
              <Card className="glass-morphism border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center gap-3">
                    <span className="text-2xl">📞</span>
                    Kontak Langsung
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* WhatsApp */}
                  <div className="flex items-center space-x-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="text-3xl">📱</div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">
                        WhatsApp Support
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Response time: Instant - 30 menit
                      </p>
                      <p className="text-green-400 font-medium">
                        +62 812-3456-7890
                      </p>
                    </div>
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() =>
                        openWhatsAppSupport(
                          "Halo, saya butuh bantuan dari halaman Contact",
                        )
                      }
                    >
                      Chat
                    </Button>
                  </div>

                  {/* Email */}
                  <div className="flex items-center space-x-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="text-3xl">📧</div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">
                        Email Support
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Response time: 2-24 jam
                      </p>
                      <p className="text-blue-400 font-medium">
                        support@klixgenix.id
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                      onClick={() =>
                        openEmailSupport("Support Request from Contact Page")
                      }
                    >
                      Email
                    </Button>
                  </div>

                  {/* Live Chat */}
                  <div className="flex items-center space-x-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <div className="text-3xl">💬</div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">Live Chat</h3>
                      <p className="text-gray-300 text-sm">
                        Available: 09:00 - 22:00 WIB
                      </p>
                      <p className="text-purple-400 font-medium">
                        Chat di website
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                      onClick={openLiveChat}
                    >
                      Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Link */}
              <Card className="glass-morphism border-white/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center gap-3">
                    <span className="text-2xl">❓</span>
                    Pertanyaan Umum
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Cek dulu FAQ kami, mungkin pertanyaan Anda sudah terjawab!
                  </p>
                  <Link to="/faq">
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      Lihat FAQ
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Office Hours */}
              <Card className="glass-morphism border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center gap-3">
                    <span className="text-2xl">🕒</span>
                    Jam Operasional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>WhatsApp Support:</span>
                      <span className="text-green-400">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email Support:</span>
                      <span className="text-blue-400">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Live Chat:</span>
                      <span className="text-purple-400">09:00 - 22:00 WIB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone Support:</span>
                      <span className="text-yellow-400">09:00 - 18:00 WIB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
