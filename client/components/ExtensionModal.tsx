import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  Chrome,
  Globe,
  Play,
  CheckCircle,
  Monitor,
  Smartphone,
  Zap,
  Shield,
  Star,
} from "lucide-react";

interface ExtensionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: "premium" | "education";
}

const features = {
  premium: [
    {
      icon: <Monitor className="w-5 h-5" />,
      title: "Netflix & Streaming",
      description: "Akses premium ke Netflix, Disney+, HBO Max",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "AI Tools",
      description: "ChatGPT Plus, Perplexity, dan AI tools premium",
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Creative Suite",
      description: "Adobe Creative Cloud, Canva Pro, Figma Pro",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Auto Login",
      description: "Login otomatis ke semua layanan premium",
    },
  ],
  education: [
    {
      icon: <Monitor className="w-5 h-5" />,
      title: "Learning Platforms",
      description: "Coursera Plus, Udemy Business, Skillshare",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Development Tools",
      description: "GitHub Pro, Vercel Pro, MongoDB Atlas",
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Office Suite",
      description: "Microsoft 365, Google Workspace Premium",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Research Tools",
      description: "Grammarly Premium, Notion Pro, Obsidian",
    },
  ],
};

export default function ExtensionModal({
  open,
  onOpenChange,
  plan,
}: ExtensionModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

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

  const currentPlan = planInfo[plan];
  const currentFeatures = features[plan];

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);

          // Trigger actual download
          const downloadLink = document.createElement("a");
          downloadLink.href = `/extensions/klixgenix-${plan}-extension.zip`;
          downloadLink.download = `klixgenix-${plan}-extension.zip`;
          downloadLink.click();

          // Close modal after download
          setTimeout(() => {
            onOpenChange(false);
          }, 2000);

          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl glass-morphism border-white/10 text-white">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center">
              <Chrome className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-white">
            Download KlixGenix Extension
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Extension browser untuk akses mudah ke semua aplikasi{" "}
            {currentPlan.name} Anda
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="download" className="w-full">
          <TabsList className="grid w-full grid-cols-3 glass-morphism">
            <TabsTrigger value="download">Download</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="guide">Installation</TabsTrigger>
          </TabsList>

          {/* Download Tab */}
          <TabsContent value="download" className="space-y-6">
            <div className="text-center">
              <Badge
                className={`${currentPlan.color} text-white border-0 mb-4`}
              >
                {currentPlan.name} - {currentPlan.apps}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Download Card */}
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-6 text-center">
                  <Download className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Browser Extension
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Extension untuk Chrome, Firefox, dan Edge
                  </p>

                  {!isDownloading ? (
                    <Button
                      onClick={handleDownload}
                      className="w-full gradient-primary text-white font-semibold py-3"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Extension
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-300"
                          style={{ width: `${downloadProgress}%` }}
                        />
                      </div>
                      <p className="text-white">
                        Downloading... {Math.round(downloadProgress)}%
                      </p>
                    </div>
                  )}
                </div>

                {/* Browser Support */}
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">
                    Browser Support:
                  </h4>
                  <div className="flex justify-between">
                    {[
                      { icon: Chrome, name: "Chrome", supported: true },
                      { icon: Globe, name: "Firefox", supported: true },
                      { icon: Globe, name: "Edge", supported: true },
                    ].map((browser) => (
                      <div key={browser.name} className="text-center">
                        <browser.icon className="w-8 h-8 mx-auto mb-1 text-green-500" />
                        <p className="text-xs text-gray-300">{browser.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4">
                  Extension Preview
                </h3>
                <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary rounded-md"></div>
                      <span className="text-white text-sm font-medium">
                        KlixGenix
                      </span>
                    </div>
                    <Badge
                      className={`${currentPlan.color} text-white text-xs`}
                    >
                      {currentPlan.name}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    {[
                      { icon: "🤖", name: "ChatGPT Plus", status: "Available" },
                      { icon: "🎬", name: "Netflix", status: "Available" },
                      { icon: "🎨", name: "Adobe Suite", status: "Available" },
                    ].map((app, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center space-x-2">
                          <span>{app.icon}</span>
                          <span className="text-white">{app.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-green-400">{app.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentFeatures.map((feature, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
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
                </div>
              ))}
            </div>

            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">
                🎉 Special Benefits:
              </h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• One-click access ke semua aplikasi premium</li>
                <li>• Auto-login tanpa perlu input username/password</li>
                <li>• Update otomatis aplikasi baru setiap minggu</li>
                <li>• Support 24/7 untuk troubleshooting</li>
              </ul>
            </div>
          </TabsContent>

          {/* Installation Guide Tab */}
          <TabsContent value="guide" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  step: 1,
                  title: "Download Extension",
                  description:
                    "Klik tombol download di tab Download untuk mengunduh file extension",
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
                  description:
                    "Aktifkan 'Developer mode' toggle di pojok kanan atas",
                  icon: <CheckCircle className="w-5 h-5" />,
                },
                {
                  step: 4,
                  title: "Load Extension",
                  description:
                    "Klik 'Load unpacked' dan pilih folder extension yang sudah diextract",
                  icon: <Play className="w-5 h-5" />,
                },
              ].map((step) => (
                <div
                  key={step.step}
                  className="flex items-start space-x-4 bg-white/5 rounded-lg p-4"
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
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">✅ Tips Sukses:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Pastikan mengunduh untuk browser yang benar</li>
                <li>• Extract file ZIP sebelum install</li>
                <li>• Pin extension ke toolbar untuk akses mudah</li>
                <li>• Restart browser setelah instalasi</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-3 mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-white/20 text-white hover:bg-white/10"
          >
            Tutup
          </Button>
          <Button
            onClick={() => window.open("/contact", "_blank")}
            className="bg-white/10 text-white hover:bg-white/20"
          >
            Butuh Bantuan?
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
