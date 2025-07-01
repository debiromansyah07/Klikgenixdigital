import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { authAPI, handleAPIError } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authAPI.login(formData);

      if (result.success && result.data) {
        login(result.data.user, result.data.token);
        toast({
          title: "Login Berhasil",
          description: "Selamat datang kembali!",
        });

        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Gagal",
        description: handleAPIError(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGoogleLogin = () => {
    // Google OAuth flow
    toast({
      title: "Google Login",
      description: "Mengalihkan ke Google OAuth...",
    });
    // For demo purposes, simulate login
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleFacebookLogin = () => {
    // Facebook OAuth flow
    toast({
      title: "Facebook Login",
      description: "Mengalihkan ke Facebook OAuth...",
    });
    // For demo purposes, simulate login
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 hero-bg"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center text-white p-12 w-full">
          {/* Brand Logo */}
          <div className="mb-8 animate-fade-in-up">
            <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-2xl p-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2F225d98a6daee4a7dba51d3c447198b87?format=webp&width=800"
                alt="KlixGenix.ID Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold mb-2 gradient-text">
              KlixGenix.ID
            </h1>
            <p className="text-xl text-gray-300">Premium Gaming Portal</p>
          </div>

          {/* Animated Lottie Area */}
          <div className="mb-8 animate-slide-in-left">
            <div className="relative">
              {/* Animated App Icons Grid */}
              <div className="grid grid-cols-3 gap-4 animate-float">
                {[
                  { emoji: "🎮", name: "Games", color: "bg-red-500" },
                  { emoji: "🎬", name: "Netflix", color: "bg-red-600" },
                  { emoji: "🎵", name: "Spotify", color: "bg-green-500" },
                  { emoji: "🤖", name: "ChatGPT", color: "bg-emerald-500" },
                  { emoji: "🎨", name: "Adobe", color: "bg-blue-500" },
                  { emoji: "📱", name: "Apps", color: "bg-purple-500" },
                ].map((app, index) => (
                  <div
                    key={app.name}
                    className={`w-16 h-16 ${app.color} rounded-xl flex items-center justify-center shadow-lg animate-bounce-delay`}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      animationDuration: "2s",
                    }}
                  >
                    <span className="text-2xl">{app.emoji}</span>
                  </div>
                ))}
              </div>

              {/* Floating particles */}
              <div className="absolute -top-4 -left-4 w-2 h-2 bg-primary rounded-full animate-ping"></div>
              <div
                className="absolute -bottom-4 -right-4 w-2 h-2 bg-purple-500 rounded-full animate-ping"
                style={{ animationDelay: "1s" }}
              ></div>
              <div className="absolute top-1/2 -left-8 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
              <div
                className="absolute top-1/4 -right-8 w-1 h-1 bg-pink-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
          </div>

          {/* Description */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <h2 className="text-2xl font-semibold mb-4">
              All in one Web-Based Platform
            </h2>
            <p className="text-gray-300 max-w-md leading-relaxed">
              Akses 50+ Aplikasi Premium, Netflix, Spotify, Adobe Creative
              Suite, dan masih banyak lagi.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-background relative overflow-hidden">
        {/* Background Pattern for right side */}
        <div className="absolute inset-0 hero-bg"></div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
          <div className="w-full max-w-md animate-slide-in-right">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-2xl p-3">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2F225d98a6daee4a7dba51d3c447198b87?format=webp&width=800"
                  alt="KlixGenix.ID Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold gradient-text">KlixGenix.ID</h1>
              <p className="text-gray-400 mt-2">Masuk ke akun Anda</p>
            </div>

            {/* Login Card */}
            <div className="glass-morphism border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
                <p className="text-gray-400">
                  Selamat datang kembali! Silakan masuk ke akun Anda.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-white text-sm font-medium"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@email.com"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 pl-12 py-3 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-white text-sm font-medium"
                  >
                    Kata sandi
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 pl-12 pr-12 py-3 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          rememberMe: checked as boolean,
                        }))
                      }
                      className="border-white/30"
                    />
                    <Label
                      htmlFor="rememberMe"
                      className="text-gray-300 text-sm"
                    >
                      Ingat saya
                    </Label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                  >
                    Lupa kata sandi?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full gradient-primary text-white font-semibold py-3 rounded-xl hover:scale-[1.02] transition-all duration-200 shadow-lg group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Memproses..."
                  ) : (
                    <span className="flex items-center justify-center">
                      Masuk
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>

                {/* Social Login */}
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-white/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-3 text-gray-400">
                        Atau masuk dengan
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleLogin}
                      className="border-white/20 text-white hover:bg-white/10 py-3 rounded-xl transition-all hover:scale-[1.02]"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleFacebookLogin}
                      className="border-white/20 text-white hover:bg-white/10 py-3 rounded-xl transition-all hover:scale-[1.02]"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <span className="text-gray-400">Belum punya akun? </span>
                  <Link
                    to="/register"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Daftar sekarang
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
