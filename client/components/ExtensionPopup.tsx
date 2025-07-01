import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Search,
  Star,
  Settings,
  LogOut,
  Play,
  Download,
  Shield,
  Zap,
  Clock,
  Globe,
  Users,
  TrendingUp,
  Heart,
  ExternalLink,
} from "lucide-react";

interface App {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  status: "available" | "premium" | "locked";
  rating: number;
  users: string;
  lastUsed?: string;
}

const apps: App[] = [
  {
    id: "chatgpt",
    name: "ChatGPT Plus",
    icon: "🤖",
    category: "AI",
    description: "AI assistant untuk berbagai kebutuhan",
    status: "available",
    rating: 4.9,
    users: "100M+",
    lastUsed: "2 mins ago",
  },
  {
    id: "netflix",
    name: "Netflix",
    icon: "🎬",
    category: "Streaming",
    description: "Streaming film dan series premium",
    status: "available",
    rating: 4.8,
    users: "200M+",
    lastUsed: "1 hour ago",
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    icon: "🎵",
    category: "Music",
    description: "Musik premium tanpa iklan",
    status: "available",
    rating: 4.7,
    users: "400M+",
    lastUsed: "30 mins ago",
  },
  {
    id: "adobe",
    name: "Adobe Creative Suite",
    icon: "🎨",
    category: "Design",
    description: "Tools design professional",
    status: "available",
    rating: 4.9,
    users: "50M+",
    lastUsed: "3 hours ago",
  },
  {
    id: "canva",
    name: "Canva Pro",
    icon: "✨",
    category: "Design",
    description: "Design tools untuk semua orang",
    status: "available",
    rating: 4.8,
    users: "120M+",
    lastUsed: "1 day ago",
  },
  {
    id: "notion",
    name: "Notion",
    icon: "📝",
    category: "Productivity",
    description: "All-in-one workspace",
    status: "available",
    rating: 4.6,
    users: "30M+",
    lastUsed: "5 hours ago",
  },
];

const categories = [
  "All",
  "Streaming",
  "AI",
  "Design",
  "Music",
  "Productivity",
];

interface ExtensionPopupProps {
  userPlan?: "premium" | "education" | "exclusive";
  userName?: string;
  userAvatar?: string;
}

export default function ExtensionPopup({
  userPlan = "premium",
  userName = "John Doe",
  userAvatar,
}: ExtensionPopupProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  const filteredApps = apps.filter((app) => {
    const matchesSearch = app.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const recentApps = apps.filter((app) => app.lastUsed).slice(0, 3);

  const planInfo = {
    premium: {
      name: "PREMIUM",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      apps: 20,
    },
    education: {
      name: "EDUCATION",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      apps: 15,
    },
    exclusive: {
      name: "EXCLUSIVE",
      color: "bg-gradient-to-r from-orange-500 to-red-500",
      apps: 30,
    },
  };

  const currentPlan = planInfo[userPlan];

  const handleAppClick = async (app: App) => {
    setIsLoading(true);

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Open app in new tab
    const urls: Record<string, string> = {
      chatgpt: "https://chat.openai.com",
      netflix: "https://netflix.com",
      spotify: "https://open.spotify.com",
      adobe: "https://www.adobe.com/creativecloud/",
      canva: "https://canva.com",
      notion: "https://notion.so",
    };

    if (urls[app.id]) {
      window.open(urls[app.id], "_blank");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-[400px] h-[600px] bg-background border border-white/10 rounded-lg shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-card border-b border-white/10 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">KlixGenix</h1>
              <Badge
                className={`${currentPlan.color} text-white text-xs border-0`}
              >
                {currentPlan.name}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-400 hover:text-white p-1"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src={userAvatar} />
              <AvatarFallback className="bg-primary text-white text-xs">
                {userName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search apps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/10 border-white/20 text-white pl-10 py-2 text-sm"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="apps" className="h-full flex flex-col">
          <TabsList className="glass-morphism m-4 grid w-auto grid-cols-3">
            <TabsTrigger value="apps" className="text-sm">
              Apps
            </TabsTrigger>
            <TabsTrigger value="recent" className="text-sm">
              Recent
            </TabsTrigger>
            <TabsTrigger value="stats" className="text-sm">
              Stats
            </TabsTrigger>
          </TabsList>

          {/* Apps Tab */}
          <TabsContent
            value="apps"
            className="flex-1 px-4 pb-4 overflow-y-auto"
          >
            {/* Categories */}
            <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  size="sm"
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "border-white/20 text-white hover:bg-white/10"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Apps Grid */}
            <div className="space-y-2">
              {filteredApps.map((app) => (
                <Card
                  key={app.id}
                  className="glass-morphism border-white/10 cursor-pointer hover:bg-white/10 transition-all hover:scale-[1.02]"
                  onClick={() => handleAppClick(app)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{app.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-medium text-sm truncate">
                            {app.name}
                          </h3>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-gray-300 text-xs">
                              {app.rating}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-400 text-xs truncate">
                          {app.description}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-gray-500 text-xs">
                            {app.users} users
                          </span>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-green-400 text-xs">
                              Available
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recent Tab */}
          <TabsContent
            value="recent"
            className="flex-1 px-4 pb-4 overflow-y-auto"
          >
            <div className="space-y-2">
              {recentApps.map((app) => (
                <Card
                  key={app.id}
                  className="glass-morphism border-white/10 cursor-pointer hover:bg-white/10 transition-all"
                  onClick={() => handleAppClick(app)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{app.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium text-sm">
                          {app.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-400 text-xs">
                            {app.lastUsed}
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent
            value="stats"
            className="flex-1 px-4 pb-4 overflow-y-auto"
          >
            <div className="space-y-4">
              {/* Plan Info */}
              <Card className="glass-morphism border-white/10">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium ${currentPlan.color}`}
                    >
                      {currentPlan.name}
                    </div>
                    <p className="text-gray-300 text-sm mt-2">
                      {currentPlan.apps} Apps Available
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Stats */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="glass-morphism border-white/10">
                  <CardContent className="p-3 text-center">
                    <div className="text-primary mb-1">
                      <Zap className="w-5 h-5 mx-auto" />
                    </div>
                    <p className="text-white font-semibold">47</p>
                    <p className="text-gray-400 text-xs">Apps Used</p>
                  </CardContent>
                </Card>

                <Card className="glass-morphism border-white/10">
                  <CardContent className="p-3 text-center">
                    <div className="text-green-500 mb-1">
                      <TrendingUp className="w-5 h-5 mx-auto" />
                    </div>
                    <p className="text-white font-semibold">12h</p>
                    <p className="text-gray-400 text-xs">This Week</p>
                  </CardContent>
                </Card>

                <Card className="glass-morphism border-white/10">
                  <CardContent className="p-3 text-center">
                    <div className="text-blue-500 mb-1">
                      <Shield className="w-5 h-5 mx-auto" />
                    </div>
                    <p className="text-white font-semibold">100%</p>
                    <p className="text-gray-400 text-xs">Secure</p>
                  </CardContent>
                </Card>

                <Card className="glass-morphism border-white/10">
                  <CardContent className="p-3 text-center">
                    <div className="text-purple-500 mb-1">
                      <Heart className="w-5 h-5 mx-auto" />
                    </div>
                    <p className="text-white font-semibold">28</p>
                    <p className="text-gray-400 text-xs">Favorites</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <Button
                  size="sm"
                  className="w-full bg-white/10 text-white hover:bg-white/20"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Open Dashboard
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download More Apps
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-white text-sm">Opening app...</p>
          </div>
        </div>
      )}
    </div>
  );
}
