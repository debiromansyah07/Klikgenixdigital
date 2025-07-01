import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function EditProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    avatar: "",
    bio: "",
    location: "",
    website: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        avatar: user.avatar || "",
        bio: user.bio || "",
        location: user.location || "",
        website: user.website || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsChanged(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Integrate with Supabase
      // const { data, error } = await supabase
      //   .from('users')
      //   .update(formData)
      //   .eq('id', user.id)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });

      setIsChanged(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Upload to Supabase Storage
      // const { data, error } = await supabase.storage
      //   .from('avatars')
      //   .upload(`${user.id}/${file.name}`, file)

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatar: reader.result as string,
        }));
        setIsChanged(true);
      };
      reader.readAsDataURL(file);
    }
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
        <div className="max-w-2xl mx-auto">
          <Card className="glass-morphism border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-3">
                <span className="text-2xl">📝</span>
                Edit Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={formData.avatar} />
                    <AvatarFallback className="bg-primary text-white text-2xl">
                      {formData.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-center space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <Label htmlFor="avatar-upload">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 cursor-pointer"
                        asChild
                      >
                        <span>📷 Change Avatar</span>
                      </Button>
                    </Label>
                    <p className="text-gray-400 text-xs">Max 5MB, JPG or PNG</p>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white">
                      Location
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-white">
                    Website
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-white">
                    Bio
                  </Label>
                  <Input
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6">
                  <Button
                    type="submit"
                    disabled={!isChanged || isLoading}
                    className="flex-1 gradient-primary text-white font-semibold"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </Button>
                </div>

                {/* Database Integration Note */}
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-400">ℹ️</span>
                    <div>
                      <p className="text-blue-400 font-medium text-sm">
                        Supabase Integration Ready
                      </p>
                      <p className="text-gray-300 text-xs mt-1">
                        Profile data will be automatically synced with Supabase
                        database when connected.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
