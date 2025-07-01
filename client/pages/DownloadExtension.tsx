import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useSearchParams } from "react-router-dom";
import {
  Download,
  CheckCircle,
  Chrome,
  Globe,
  Play,
  Monitor,
  Smartphone,
} from "lucide-react";

const browserSteps = {
  chrome: [
    {
      step: 1,
      title: "Download Extension",
      description: "Klik tombol download di atas untuk mengunduh file ekstensi",
      icon: <Download className="w-5 h-5" />,
    },
    {
      step: 2,
      title: "Buka Chrome Extensions",
      description:
        "Buka chrome://extensions/ atau Menu > More Tools > Extensions",
      icon: <Chrome className="w-5 h-5" />,
    },
    {
      step: 3,
      title: "Enable Developer Mode",
      description: "Aktifkan 'Developer mode' di pojok kanan atas",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      step: 4,
      title: "Load Extension",
      description:
        "Klik 'Load unpacked' dan pilih folder ekstensi yang sudah didownload",
      icon: <Play className="w-5 h-5" />,
    },
  ],
};

export default function DownloadExtension() {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") || "premium";
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const planInfo = {
    premium: {
      name: "PREMIUM",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      apps: "20+ Premium Apps",
    },
    education: {
      name: "EDUCATION",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      apps: "15+ Education Apps",
    },
  };

  const currentPlan =
    planInfo[plan as keyof typeof planInfo] || planInfo.premium;

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setDownloadComplete(true);

          // Trigger actual download
          const downloadLink = document.createElement("a");
          downloadLink.href = `/extensions/klixgenix-${plan}-extension.zip`;
          downloadLink.download = `klixgenix-${plan}-extension.zip`;
          downloadLink.click();

          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
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
              <Badge className={`${currentPlan.color} text-white border-0`}>
                {currentPlan.name}
              </Badge>
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-padding py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-white mb-2">
                Payment Berhasil! 🎉
              </h1>
              <p className="text-gray-300 text-lg">
                Selamat! Akun {currentPlan.name} Anda sudah aktif. Saatnya
                download extension untuk mulai menikmati {currentPlan.apps}.
              </p>
            </div>
          </div>

          {/* Download Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Download Card */}
            <Card className="glass-morphism border-white/10 animate-slide-in-left">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Download className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-white text-2xl">
                  Download Extension
                </CardTitle>
                <p className="text-gray-300">
                  Extension untuk {currentPlan.name} dengan akses ke semua fitur
                  premium
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {!downloadComplete ? (
                  <>
                    {!isDownloading ? (
                      <Button
                        onClick={handleDownload}
                        className="w-full gradient-primary text-white font-semibold py-4 text-lg hover:scale-105 transition-transform"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download KlixGenix Extension
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-300 ease-out"
                            style={{ width: `${downloadProgress}%` }}
                          />
                        </div>
                        <p className="text-center text-white">
                          Downloading... {Math.round(downloadProgress)}%
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center space-y-4">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                    <p className="text-green-400 font-semibold">
                      Download Complete!
                    </p>
                    <p className="text-gray-300 text-sm">
                      File tersimpan di folder Downloads Anda
                    </p>
                  </div>
                )}

                {/* Browser Support */}
                <div className="border-t border-white/10 pt-6">
                  <p className="text-white text-sm font-medium mb-3">
                    Supported Browsers:
                  </p>
                  <div className="flex justify-center space-x-4">
                    {[
                      { icon: Chrome, name: "Chrome", supported: true },
                      { icon: Globe, name: "Firefox", supported: true },
                      { icon: Globe, name: "Edge", supported: true },
                      { icon: Globe, name: "Safari", supported: false },
                    ].map((browser) => (
                      <div key={browser.name} className="text-center">
                        <browser.icon
                          className={`w-8 h-8 mx-auto mb-1 ${
                            browser.supported
                              ? "text-green-500"
                              : "text-gray-500"
                          }`}
                        />
                        <p
                          className={`text-xs ${
                            browser.supported
                              ? "text-gray-300"
                              : "text-gray-500"
                          }`}
                        >
                          {browser.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features Preview */}
            <Card className="glass-morphism border-white/10 animate-slide-in-right">
              <CardHeader>
                <CardTitle className="text-white">
                  Apa yang Anda Dapatkan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    icon: <Monitor className="w-5 h-5" />,
                    title: "One-Click Access",
                    description:
                      "Akses semua aplikasi premium dengan sekali klik",
                  },
                  {
                    icon: <Smartphone className="w-5 h-5" />,
                    title: "Auto Login",
                    description: "Login otomatis ke semua layanan premium",
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    title: "Real-time Updates",
                    description: "Update otomatis aplikasi dan fitur baru",
                  },
                  {
                    icon: <Play className="w-5 h-5" />,
                    title: "Premium Content",
                    description:
                      plan === "education"
                        ? "Akses unlimited ke platform pembelajaran premium"
                        : "Streaming, design tools, dan software premium",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="text-primary mt-1">{feature.icon}</div>
                    <div>
                      <h4 className="text-white font-medium">
                        {feature.title}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Installation Guide */}
          <Card className="glass-morphism border-white/10 animate-slide-in-up">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Chrome className="w-6 h-6 mr-2 text-primary" />
                Panduan Instalasi (Chrome)
              </CardTitle>
              <p className="text-gray-300">
                Ikuti langkah-langkah berikut untuk menginstall extension di
                browser Anda
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {browserSteps.chrome.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1 flex items-center">
                        {step.icon}
                        <span className="ml-2">{step.title}</span>
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <h4 className="text-white font-medium mb-2 flex items-center">
                  💡 Pro Tips:
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Pin extension ke toolbar untuk akses mudah</li>
                  <li>• Extension akan update otomatis saat ada fitur baru</li>
                  <li>• Gunakan mode incognito untuk testing</li>
                  <li>• Hubungi support jika ada kendala instalasi</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="text-center mt-12 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button className="bg-white/10 text-white border border-white/20 hover:bg-white/20 px-8 py-3">
                  Ke Dashboard
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-3"
                >
                  Butuh Bantuan?
                </Button>
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              Jika mengalami masalah, hubungi tim support kami 24/7
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
