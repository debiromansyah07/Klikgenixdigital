import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import CredentialsModal from "@/components/CredentialsModal";
import UpgradePlanModal from "@/components/UpgradePlanModal";
import { openWhatsAppSupport, openEmailSupport } from "@/lib/support";

const userData = {
  name: "John Doe",
  email: "john@example.com",
  plan: "EXCLUSIVE", // Changed to show exclusive features
  planExpiry: "2024-12-15",
  usageQuota: 75,
  totalApps: 50,
  usedApps: 15,
};

const recentActivities = [
  {
    app: "Netflix",
    action: "Watched Movie",
    time: "2 hours ago",
    icon: "🎬",
  },
  {
    app: "ChatGPT",
    action: "AI Chat Session",
    time: "4 hours ago",
    icon: "🤖",
  },
  {
    app: "Spotify",
    action: "Played Music",
    time: "6 hours ago",
    icon: "🎵",
  },
  {
    app: "Adobe Photoshop",
    action: "Image Editing",
    time: "1 day ago",
    icon: "🎨",
  },
];

const availableApps = [
  { name: "Netflix", category: "Entertainment", status: "active", icon: "🎬" },
  { name: "ChatGPT", category: "AI", status: "active", icon: "🤖" },
  { name: "Spotify", category: "Music", status: "active", icon: "🎵" },
  {
    name: "Adobe Creative Suite",
    category: "Design",
    status: "active",
    icon: "🎨",
  },
  {
    name: "Microsoft Office",
    category: "Productivity",
    status: "active",
    icon: "📊",
  },
  { name: "Canva Pro", category: "Design", status: "active", icon: "🖼️" },
  { name: "Zoom Pro", category: "Communication", status: "active", icon: "📹" },
  { name: "Grammarly", category: "Writing", status: "active", icon: "✏️" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [isCredentialsModalOpen, setIsCredentialsModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari akun.",
    });
    navigate("/");
  };

  const handleAppClick = (app: any) => {
    if (userData.plan === "EXCLUSIVE") {
      setSelectedApp(app);
      setIsCredentialsModalOpen(true);
    } else {
      toast({
        title: "Extension Required",
        description: `Please use KlixGenix Extension to access ${app.name}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Credentials Modal */}
      <CredentialsModal
        isOpen={isCredentialsModalOpen}
        onClose={() => setIsCredentialsModalOpen(false)}
        app={selectedApp || { name: "", icon: "", category: "" }}
      />

      {/* Upgrade Plan Modal */}
      <UpgradePlanModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        currentPlan={userData.plan}
      />

      {/* Header */}
      <header className="bg-card border-b border-white/10">
        <div className="container-padding py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold gradient-text">
                KlixGenix.ID
              </Link>
              <Badge variant="secondary" className="bg-primary text-white">
                {userData.plan}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">
                Welcome, {user?.fullName || "User"}
              </span>
              <Button
                variant="ghost"
                className="text-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-padding py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-4 glass-morphism hover:scale-[1.02] transition-transform duration-300">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="apps"
              className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              My Apps
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              Billing
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-morphism border-white/10 hover:scale-105 hover:border-primary/30 transition-all duration-300 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    Active Plan
                  </CardTitle>
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    💎
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {userData.plan}
                  </div>
                  <p className="text-xs text-gray-400">
                    Expires on {userData.planExpiry}
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-morphism border-white/10 hover:scale-105 hover:border-primary/30 transition-all duration-300 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    Apps Used
                  </CardTitle>
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    📱
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {userData.usedApps}/{userData.totalApps}
                  </div>
                  <Progress
                    value={(userData.usedApps / userData.totalApps) * 100}
                    className="mt-2 transition-all duration-1000 ease-out"
                  />
                </CardContent>
              </Card>

              <Card className="glass-morphism border-white/10 hover:scale-105 hover:border-primary/30 transition-all duration-300 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    Usage Quota
                  </CardTitle>
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    ⚡
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {userData.usageQuota}%
                  </div>
                  <Progress
                    value={userData.usageQuota}
                    className="mt-2 transition-all duration-1000 ease-out"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="glass-morphism border-white/10 hover:scale-[1.02] transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-300">
                  Your latest app usage and activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animation: "fadeInUp 0.6s ease-out forwards",
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                          {activity.icon}
                        </div>
                        <div>
                          <p className="text-white font-medium group-hover:text-primary transition-colors">
                            {activity.app}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {activity.action}
                          </p>
                        </div>
                      </div>
                      <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Apps Tab */}
          <TabsContent value="apps" className="space-y-6">
            {/* Access Method Info */}
            <Card className="glass-morphism border-white/10 border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <span className="text-2xl">
                    {userData.plan === "EXCLUSIVE" ? "🔑" : "🔧"}
                  </span>
                  Access Method - {userData.plan} Plan
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {userData.plan === "EXCLUSIVE"
                    ? "Akses langsung dengan username & password yang disediakan"
                    : "Download extension untuk akses mudah ke semua aplikasi"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userData.plan === "EXCLUSIVE" ? (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <p className="text-green-400 font-medium mb-2">
                      ✅ Direct Access Available
                    </p>
                    <p className="text-gray-300 text-sm">
                      Klik pada aplikasi untuk melihat username dan password
                      yang dapat Anda gunakan.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <p className="text-blue-400 font-medium mb-2">
                        📥 Extension Required
                      </p>
                      <p className="text-gray-300 text-sm mb-3">
                        Download extension KlixGenix untuk akses mudah ke semua
                        aplikasi premium.
                      </p>
                      <Button
                        className="gradient-primary text-white hover:scale-105 transition-transform duration-300"
                        onClick={() => {
                          // Create a dummy extension file download
                          const element = document.createElement("a");
                          const file = new Blob(
                            [
                              '// KlixGenix Extension v1.0\nconsole.log("Extension loaded");',
                            ],
                            { type: "text/plain" },
                          );
                          element.href = URL.createObjectURL(file);
                          element.download = "KlixGenix-Extension.zip";
                          document.body.appendChild(element);
                          element.click();
                          document.body.removeChild(element);

                          toast({
                            title: "Download Started",
                            description:
                              "KlixGenix Extension is downloading. Install it in your browser to access premium apps.",
                          });
                        }}
                      >
                        📥 Download Extension
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="glass-morphism border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Available Apps</CardTitle>
                <CardDescription className="text-gray-300">
                  {userData.plan === "EXCLUSIVE"
                    ? "Klik untuk melihat kredensial akses"
                    : "Gunakan extension untuk akses instant"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {availableApps.map((app, index) => (
                    <div
                      key={index}
                      className="glass-morphism border-white/20 hover:border-primary/50 rounded-lg p-6 flex flex-col items-center space-y-3 cursor-pointer group hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
                      onClick={() => handleAppClick(app)}
                    >
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {app.icon}
                      </div>
                      <div className="text-center">
                        <p className="text-white font-medium group-hover:text-primary transition-colors">
                          {app.name}
                        </p>
                        <p className="text-gray-400 text-sm">{app.category}</p>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <Badge
                          variant={
                            app.status === "active" ? "default" : "secondary"
                          }
                          className="bg-green-600 text-white"
                        >
                          {app.status}
                        </Badge>
                        {userData.plan === "EXCLUSIVE" && (
                          <Badge
                            variant="outline"
                            className="border-primary text-primary text-xs"
                          >
                            Direct Access
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            {/* Plan Features Info */}
            <Card className="glass-morphism border-white/10 border-primary/20 hover-lift">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <span className="text-2xl">✨</span>
                  {userData.plan} Plan Features
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Akses method dan benefits yang Anda miliki
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Access Method:</h4>
                    {userData.plan === "EXCLUSIVE" ? (
                      <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-purple-400">🔑</span>
                          <span className="text-purple-400 font-medium">
                            Direct Credentials
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Username & password langsung tersedia untuk setiap
                          aplikasi
                        </p>
                      </div>
                    ) : (
                      <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-blue-400">🔧</span>
                          <span className="text-blue-400 font-medium">
                            Browser Extension
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Akses melalui extension browser yang mudah digunakan
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Benefits:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">✅</span>
                        <span className="text-gray-300 text-sm">
                          50+ Premium Apps
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">✅</span>
                        <span className="text-gray-300 text-sm">
                          24/7 Support
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">✅</span>
                        <span className="text-gray-300 text-sm">
                          Regular Updates
                        </span>
                      </div>
                      {userData.plan === "EXCLUSIVE" && (
                        <div className="flex items-center space-x-2">
                          <span className="text-purple-400">⭐</span>
                          <span className="text-purple-300 text-sm">
                            Premium Support
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Plan */}
              <Card className="glass-morphism border-white/10 hover-lift">
                <CardHeader>
                  <CardTitle className="text-white">Current Plan</CardTitle>
                  <CardDescription className="text-gray-300">
                    Your subscription details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Plan</span>
                    <Badge className="bg-primary text-white">
                      {userData.plan}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Monthly Cost</span>
                    <span className="text-white font-bold">Rp49.000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Next Billing</span>
                    <span className="text-white">{userData.planExpiry}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Auto Renewal</span>
                    <Badge
                      variant="secondary"
                      className="bg-green-600 text-white"
                    >
                      Active
                    </Badge>
                  </div>
                  <div className="pt-4 space-y-2">
                    <Button
                      className="w-full gradient-primary text-white"
                      onClick={() => setIsUpgradeModalOpen(true)}
                    >
                      Upgrade Plan
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white"
                    >
                      Cancel Subscription
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Payment History */}
              <Card className="glass-morphism border-white/10 hover-lift">
                <CardHeader>
                  <CardTitle className="text-white">Payment History</CardTitle>
                  <CardDescription className="text-gray-300">
                    Your recent transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        date: "Nov 15, 2024",
                        amount: "Rp49.000",
                        status: "Paid",
                      },
                      {
                        date: "Oct 15, 2024",
                        amount: "Rp49.000",
                        status: "Paid",
                      },
                      {
                        date: "Sep 15, 2024",
                        amount: "Rp49.000",
                        status: "Paid",
                      },
                    ].map((payment, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                          animation: "fadeInUp 0.6s ease-out forwards",
                        }}
                      >
                        <div>
                          <p className="text-white">{payment.date}</p>
                          <p className="text-gray-400 text-sm">
                            Monthly Subscription
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">
                            {payment.amount}
                          </p>
                          <Badge className="bg-green-600 text-white">
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="glass-morphism border-white/10 hover-lift">
              <CardHeader>
                <CardTitle className="text-white">Account Settings</CardTitle>
                <CardDescription className="text-gray-300">
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-medium mb-2">
                      Profile Information
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-300">Name: {userData.name}</p>
                      <p className="text-gray-300">Email: {userData.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    {[
                      {
                        icon: "📝",
                        text: "Edit Profile",
                        action: () => navigate("/profile/edit"),
                      },
                      {
                        icon: "🔒",
                        text: "Change Password",
                        action: () => navigate("/profile/password"),
                      },
                      {
                        icon: "🔔",
                        text: "Notification Settings",
                        action: () => navigate("/profile/notifications"),
                      },
                      {
                        icon: "📱",
                        text: "Download Extension",
                        action: () => {
                          // Download extension
                          const element = document.createElement("a");
                          const file = new Blob(
                            [
                              '// KlixGenix Extension v1.0\nconsole.log("Extension loaded");',
                            ],
                            { type: "text/plain" },
                          );
                          element.href = URL.createObjectURL(file);
                          element.download = "KlixGenix-Extension.zip";
                          document.body.appendChild(element);
                          element.click();
                          document.body.removeChild(element);
                          toast({
                            title: "Download Started",
                            description: "Extension berhasil didownload",
                          });
                        },
                      },
                      {
                        icon: "❓",
                        text: "Help & Support",
                        action: () => navigate("/faq"),
                      },
                    ].map((item, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="border-white/20 text-white justify-start hover:scale-[1.02] hover:border-primary/50 transition-all duration-300 group"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                          animation: "slideInLeft 0.6s ease-out forwards",
                        }}
                        onClick={item.action}
                      >
                        <span className="group-hover:scale-110 transition-transform duration-300 mr-2">
                          {item.icon}
                        </span>
                        {item.text}
                      </Button>
                    ))}
                  </div>

                  {/* Additional Contact Options */}
                  <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">
                      Butuh Bantuan?
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={() => navigate("/faq")}
                      >
                        ❓ FAQ
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={() => navigate("/contact")}
                      >
                        📞 Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
