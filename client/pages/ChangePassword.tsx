import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function ChangePassword() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: "New password and confirmation don't match.",
      });
      return;
    }

    const passwordValidation = validatePassword(formData.newPassword);
    if (!passwordValidation.isValid) {
      toast({
        variant: "destructive",
        title: "Weak Password",
        description: "Please ensure your password meets all requirements.",
      });
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Integrate with Supabase
      // const { error } = await supabase.auth.updateUser({
      //   password: formData.newPassword
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      });

      // Clear form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Redirect after success
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Failed to update password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordValidation = validatePassword(formData.newPassword);

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
        <div className="max-w-md mx-auto">
          <Card className="glass-morphism border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-3">
                <span className="text-2xl">🔒</span>
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Current Password */}
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-white">
                    Current Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type={showPasswords.current ? "text" : "password"}
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("current")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPasswords.current ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-white">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showPasswords.new ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("new")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPasswords.new ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                {formData.newPassword && (
                  <div className="space-y-2">
                    <p className="text-gray-300 text-sm">
                      Password requirements:
                    </p>
                    <div className="space-y-1">
                      {[
                        {
                          check: passwordValidation.minLength,
                          text: "At least 8 characters",
                        },
                        {
                          check: passwordValidation.hasUpper,
                          text: "One uppercase letter",
                        },
                        {
                          check: passwordValidation.hasLower,
                          text: "One lowercase letter",
                        },
                        {
                          check: passwordValidation.hasNumber,
                          text: "One number",
                        },
                        {
                          check: passwordValidation.hasSpecial,
                          text: "One special character",
                        },
                      ].map((req, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <span
                            className={
                              req.check ? "text-green-400" : "text-gray-400"
                            }
                          >
                            {req.check ? "✅" : "⭕"}
                          </span>
                          <span
                            className={`text-xs ${req.check ? "text-green-400" : "text-gray-400"}`}
                          >
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPasswords.confirm ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("confirm")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPasswords.confirm ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {formData.confirmPassword &&
                    formData.newPassword !== formData.confirmPassword && (
                      <p className="text-red-400 text-xs">
                        Passwords don't match
                      </p>
                    )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={
                    isLoading ||
                    !passwordValidation.isValid ||
                    formData.newPassword !== formData.confirmPassword
                  }
                  className="w-full gradient-primary text-white font-semibold"
                >
                  {isLoading ? "Updating..." : "Change Password"}
                </Button>

                {/* Security Tips */}
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <span className="text-yellow-400">🔐</span>
                    <div>
                      <p className="text-yellow-400 font-medium text-sm">
                        Security Tips
                      </p>
                      <ul className="text-gray-300 text-xs mt-2 space-y-1">
                        <li>
                          • Use a unique password for your KlixGenix account
                        </li>
                        <li>• Don't share your password with anyone</li>
                        <li>• Consider using a password manager</li>
                        <li>• Change your password regularly</li>
                      </ul>
                    </div>
                  </div>
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
                        Password changes will be securely handled by Supabase
                        Auth when connected.
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
