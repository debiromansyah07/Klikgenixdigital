import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { authAPI, handleAPIError } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  Shield,
  Star,
} from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreeTerms: false,
    agreeMarketing: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password tidak cocok!",
      });
      return;
    }

    if (!formData.agreeTerms) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Anda harus menyetujui syarat dan ketentuan!",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await authAPI.register(formData);

      if (result.success) {
        toast({
          title: "Registrasi Berhasil",
          description:
            "Akun Anda telah dibuat. Silakan login untuk melanjutkan.",
        });
        navigate("/login");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registrasi Gagal",
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

  const handleGoogleRegister = () => {
    // Google OAuth flow
    toast({
      title: "Google Register",
      description: "Mengalihkan ke Google OAuth...",
    });
    // For demo purposes, simulate registration
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleFacebookRegister = () => {
    // Facebook OAuth flow
    toast({
      title: "Facebook Register",
      description: "Mengalihkan ke Facebook OAuth...",
    });
    // For demo purposes, simulate registration
    setTimeout(() => {
      navigate("/login");
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

          {/* Benefits Cards */}
          <div className="space-y-4 mb-8 animate-slide-in-left">
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                title: "100% Secure",
                description: "Data aman dengan enkripsi tingkat enterprise",
              },
              {
                icon: <Star className="w-6 h-6" />,
                title: "Premium Access",
                description: "Akses ke 50+ aplikasi premium terpopuler",
              },
              {
                icon: <User className="w-6 h-6" />,
                title: "Join 100K+ Users",
                description: "Bergabung dengan komunitas pengguna aktif",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-primary">{benefit.icon}</div>
                <div className="text-left">
                  <h3 className="font-semibold text-white">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Animated Stats */}
          <div
            className="grid grid-cols-3 gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-gray-300">Premium Apps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100K+</div>
              <div className="text-sm text-gray-300">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-gray-300">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
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
              <p className="text-gray-400 mt-2">
                Bergabung dengan ribuan pengguna
              </p>
            </div>

            {/* Register Card */}
            <div className="glass-morphism border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Daftar</h2>
                <p className="text-gray-400">
                  Buat akun baru untuk mengakses layanan premium
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="fullName"
                    className="text-white text-sm font-medium"
                  >
                    Nama Lengkap
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Masukkan nama lengkap"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 pl-12 py-3 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                      required
                    />
                  </div>
                </div>

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

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-white text-sm font-medium"
                  >
                    Nomor Telepon
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+62 812-3456-7890"
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
                    Kata Sandi
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimal 8 karakter"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 pl-12 pr-12 py-3 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                      required
                      minLength={8}
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

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-white text-sm font-medium"
                  >
                    Konfirmasi Kata Sandi
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Ulangi kata sandi"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 pl-12 pr-12 py-3 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          agreeTerms: checked as boolean,
                        }))
                      }
                      className="border-white/30 mt-1"
                    />
                    <Label
                      htmlFor="agreeTerms"
                      className="text-gray-300 text-sm leading-5"
                    >
                      Saya menyetujui{" "}
                      <Link
                        to="/terms"
                        className="text-primary hover:text-primary/80 font-medium"
                      >
                        Syarat & Ketentuan
                      </Link>{" "}
                      dan{" "}
                      <Link
                        to="/privacy"
                        className="text-primary hover:text-primary/80 font-medium"
                      >
                        Kebijakan Privasi
                      </Link>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeMarketing"
                      name="agreeMarketing"
                      checked={formData.agreeMarketing}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          agreeMarketing: checked as boolean,
                        }))
                      }
                      className="border-white/30 mt-1"
                    />
                    <Label
                      htmlFor="agreeMarketing"
                      className="text-gray-300 text-sm leading-5"
                    >
                      Saya ingin menerima update produk dan penawaran khusus
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full gradient-primary text-white font-semibold py-3 rounded-xl hover:scale-[1.02] transition-all duration-200 shadow-lg group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Membuat Akun..."
                  ) : (
                    <span className="flex items-center justify-center">
                      Daftar Sekarang
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>

                {/* Social Register */}
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-white/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-3 text-gray-400">
                        Atau daftar dengan
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleRegister}
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
                      onClick={handleFacebookRegister}
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

                {/* Login Link */}
                <div className="text-center">
                  <span className="text-gray-400">Sudah punya akun? </span>
                  <Link
                    to="/login"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Masuk di sini
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
