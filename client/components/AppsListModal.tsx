import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface App {
  name: string;
  icon: string;
  category: string;
  description: string;
}

interface AppsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
  accessMethod: string;
}

const premiumApps: App[] = [
  {
    name: "System Preferences",
    icon: "⚙️",
    category: "System",
    description: "macOS system configuration",
  },
  {
    name: "Netflix",
    icon: "🎬",
    category: "Streaming",
    description: "Film dan series premium",
  },
  {
    name: "TeamViewer",
    icon: "🖥️",
    category: "Remote Access",
    description: "Remote desktop access",
  },
  {
    name: "RapidWeaver",
    icon: "🌐",
    category: "Web Design",
    description: "Website builder tool",
  },
  {
    name: "VirtualBuddy",
    icon: "💻",
    category: "Virtualization",
    description: "Virtual machine manager",
  },
  {
    name: "Canva Pro",
    icon: "🎨",
    category: "Design",
    description: "Design tool online premium",
  },
  {
    name: "MoneyMoney",
    icon: "💰",
    category: "Finance",
    description: "Banking dan finance manager",
  },
  {
    name: "MaCleaner 12",
    icon: "🧹",
    category: "Utility",
    description: "Mac cleaning utility",
  },
  {
    name: "Adobe Photoshop",
    icon: "🖼️",
    category: "Design",
    description: "Professional photo editor",
  },
  {
    name: "Adobe Illustrator",
    icon: "���",
    category: "Design",
    description: "Vector graphics editor",
  },
  {
    name: "Adobe Premiere Pro",
    icon: "🎬",
    category: "Video",
    description: "Professional video editor",
  },
  {
    name: "Microsoft Word",
    icon: "📝",
    category: "Productivity",
    description: "Document processor",
  },
  {
    name: "Microsoft PowerPoint",
    icon: "📊",
    category: "Productivity",
    description: "Presentation software",
  },
  {
    name: "PDF Expert",
    icon: "📄",
    category: "Productivity",
    description: "PDF editor professional",
  },
  {
    name: "Figma",
    icon: "🎯",
    category: "Design",
    description: "UI/UX design collaborative",
  },
  {
    name: "YouTube",
    icon: "📺",
    category: "Streaming",
    description: "Video streaming platform",
  },
  {
    name: "Grammarly",
    icon: "✏️",
    category: "Writing",
    description: "Grammar checker advanced",
  },
  {
    name: "Font File Browser",
    icon: "🔤",
    category: "Design",
    description: "Font management tool",
  },
  {
    name: "CleanMyMac X",
    icon: "🧹",
    category: "Utility",
    description: "Mac optimization tool",
  },
  {
    name: "Apple TV",
    icon: "📺",
    category: "Streaming",
    description: "Apple streaming service",
  },
];

const exclusiveApps: App[] = [
  // All premium apps plus exclusive ones
  ...premiumApps,
  {
    name: "Spotify Premium",
    icon: "🎵",
    category: "Music",
    description: "Music streaming premium",
  },
  {
    name: "ChatGPT Plus",
    icon: "🤖",
    category: "AI",
    description: "AI assistant premium",
  },
  {
    name: "GitHub Desktop",
    icon: "💻",
    category: "Development",
    description: "Git version control",
  },
  {
    name: "Perplexity AI",
    icon: "🔮",
    category: "AI",
    description: "AI-powered search",
  },
  {
    name: "Linear",
    icon: "📈",
    category: "Productivity",
    description: "Issue tracking tool",
  },
  {
    name: "DaVinci Resolve",
    icon: "🎬",
    category: "Video",
    description: "Professional video editor",
  },
  {
    name: "Notion",
    icon: "📝",
    category: "Productivity",
    description: "All-in-one workspace",
  },
  {
    name: "Zoom",
    icon: "📹",
    category: "Communication",
    description: "Video conferencing premium",
  },
  {
    name: "WhatsApp",
    icon: "💬",
    category: "Communication",
    description: "Messaging platform",
  },
  {
    name: "Dropbox",
    icon: "☁️",
    category: "Storage",
    description: "Cloud storage premium",
  },
  {
    name: "1Password",
    icon: "🔐",
    category: "Security",
    description: "Password manager premium",
  },
  {
    name: "Finder",
    icon: "📁",
    category: "System",
    description: "macOS file manager",
  },
];

const educationApps: App[] = [
  {
    name: "Spotify Premium",
    icon: "🎵",
    category: "Music",
    description: "Music streaming untuk fokus belajar",
  },
  {
    name: "GitHub Desktop",
    icon: "💻",
    category: "Development",
    description: "Version control untuk student",
  },
  {
    name: "Canva Pro",
    icon: "🎨",
    category: "Design",
    description: "Design tool untuk presentasi",
  },
  {
    name: "MoneyMoney",
    icon: "💰",
    category: "Finance",
    description: "Financial literacy tool",
  },
  {
    name: "Excel",
    icon: "📊",
    category: "Productivity",
    description: "Spreadsheet untuk data analysis",
  },
  {
    name: "PowerPoint",
    icon: "📈",
    category: "Productivity",
    description: "Presentation software",
  },
  {
    name: "Linear",
    icon: "📋",
    category: "Productivity",
    description: "Project management for students",
  },
  {
    name: "Word",
    icon: "📝",
    category: "Productivity",
    description: "Document processor",
  },
  {
    name: "OneNote",
    icon: "📔",
    category: "Education",
    description: "Digital note-taking",
  },
  {
    name: "Figma",
    icon: "🎯",
    category: "Design",
    description: "UI/UX design untuk student",
  },
  {
    name: "DaVinci Resolve",
    icon: "🎬",
    category: "Video",
    description: "Video editing untuk project",
  },
  {
    name: "Zoom",
    icon: "📹",
    category: "Communication",
    description: "Video learning platform",
  },
  {
    name: "Font File Browser",
    icon: "🔤",
    category: "Design",
    description: "Typography learning tool",
  },
  {
    name: "PDF Expert",
    icon: "📄",
    category: "Productivity",
    description: "PDF reader dan annotation",
  },
  {
    name: "c.ai",
    icon: "🤖",
    category: "AI",
    description: "AI chatbot untuk pembelajaran",
  },
  {
    name: "Perplexity AI",
    icon: "🔮",
    category: "AI",
    description: "AI research assistant",
  },
];

export default function AppsListModal({
  isOpen,
  onClose,
  planName,
  planPrice,
  accessMethod,
}: AppsListModalProps) {
  const getAppsForPlan = (plan: string): App[] => {
    switch (plan.toLowerCase()) {
      case "premium":
        return premiumApps;
      case "exclusive":
        return exclusiveApps;
      case "education":
        return educationApps;
      default:
        return premiumApps;
    }
  };

  const apps = getAppsForPlan(planName);
  const categories = [...new Set(apps.map((app) => app.category))];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-morphism border-white/20 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <DialogTitle className="text-2xl text-white flex items-center gap-3">
                <span className="text-3xl">
                  {planName === "EXCLUSIVE"
                    ? "💎"
                    : planName === "EDUCATION"
                      ? "🎓"
                      : "⭐"}
                </span>
                Paket {planName}
              </DialogTitle>
              <DialogDescription className="text-gray-300 mt-2">
                {apps.length} aplikasi premium tersedia • {accessMethod}
              </DialogDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{planPrice}</div>
              <div className="text-sm text-gray-400">per bulan</div>
            </div>
          </div>

          {/* Access Method Info */}
          <div
            className={`rounded-lg p-4 mb-6 ${
              accessMethod === "Direct Credentials"
                ? "bg-purple-500/20 border border-purple-500/30"
                : "bg-blue-500/20 border border-blue-500/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={
                  accessMethod === "Direct Credentials"
                    ? "text-purple-400"
                    : "text-blue-400"
                }
              >
                {accessMethod === "Direct Credentials" ? "🔑" : "🔧"}
              </span>
              <span
                className={`font-medium ${accessMethod === "Direct Credentials" ? "text-purple-400" : "text-blue-400"}`}
              >
                {accessMethod}
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              {accessMethod === "Direct Credentials"
                ? "Akses langsung dengan username & password yang disediakan untuk setiap aplikasi"
                : "Download extension KlixGenix untuk akses mudah ke semua aplikasi premium"}
            </p>
          </div>
        </DialogHeader>

        {/* Apps by Category */}
        <div className="space-y-6">
          {categories.map((category) => {
            const categoryApps = apps.filter(
              (app) => app.category === category,
            );
            return (
              <div key={category}>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-primary text-primary"
                  >
                    {category}
                  </Badge>
                  <span className="text-gray-400 text-sm">
                    ({categoryApps.length} apps)
                  </span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categoryApps.map((app, index) => (
                    <div
                      key={index}
                      className="glass-morphism border-white/10 rounded-lg p-4 hover:border-primary/50 transition-all duration-300 group hover:scale-[1.02]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                          {app.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white group-hover:text-primary transition-colors truncate">
                            {app.name}
                          </h4>
                          <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                            {app.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 pt-6 border-t border-white/10">
          <Button
            asChild
            className="flex-1 gradient-primary text-white font-medium"
          >
            <a href={`/payment?plan=${planName.toLowerCase()}`}>
              Mulai Berlangganan {planName}
            </a>
          </Button>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            onClick={onClose}
          >
            Tutup
          </Button>
        </div>

        {/* Footer Note */}
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mt-4">
          <p className="text-yellow-400 text-sm flex items-start gap-2">
            <span>ℹ️</span>
            <span>
              Daftar aplikasi dapat berubah sewaktu-waktu. Semua aplikasi
              dijamin aktif dan terupdate secara berkala.
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
