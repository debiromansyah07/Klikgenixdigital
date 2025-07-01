import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  app: {
    name: string;
    icon: string;
    category: string;
  };
}

export default function CredentialsModal({
  isOpen,
  onClose,
  app,
}: CredentialsModalProps) {
  const [showPassword, setShowPassword] = useState(false);

  // Generate dummy credentials
  const credentials = {
    username: `user_${Math.random().toString(36).substr(2, 8)}`,
    password: `Pass${Math.random().toString(36).substr(2, 8)}!`,
    loginUrl: `https://${app.name.toLowerCase().replace(/\s+/g, "")}.com/login`,
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`${type} copied to clipboard!`);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-morphism border-white/20 text-white max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-4">
            <div className="text-4xl">{app.icon}</div>
            <div>
              <DialogTitle className="text-xl text-white">
                {app.name}
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                {app.category} • Exclusive Access
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Success Alert */}
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✅</span>
              <span className="text-green-400 font-medium">
                Credentials Ready
              </span>
            </div>
            <p className="text-gray-300 text-sm mt-1">
              Use these credentials to login directly to {app.name}
            </p>
          </div>

          {/* Credentials */}
          <div className="space-y-4">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Username
              </label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-white/10 border border-white/20 rounded-lg p-3 font-mono text-sm">
                  {credentials.username}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() =>
                    copyToClipboard(credentials.username, "Username")
                  }
                >
                  📋
                </Button>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-white/10 border border-white/20 rounded-lg p-3 font-mono text-sm">
                  {showPassword ? credentials.password : "••••••••••"}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() =>
                    copyToClipboard(credentials.password, "Password")
                  }
                >
                  📋
                </Button>
              </div>
            </div>

            {/* Login URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Login URL
              </label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-white/10 border border-white/20 rounded-lg p-3 text-sm text-blue-300 break-all">
                  {credentials.loginUrl}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => copyToClipboard(credentials.loginUrl, "URL")}
                >
                  📋
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              className="w-full gradient-primary text-white font-medium"
              onClick={() => window.open(credentials.loginUrl, "_blank")}
            >
              🚀 Open {app.name} & Login
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => {
                  copyToClipboard(
                    `Username: ${credentials.username}\nPassword: ${credentials.password}\nURL: ${credentials.loginUrl}`,
                    "All credentials",
                  );
                }}
              >
                📋 Copy All
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={onClose}
              >
                ✕ Close
              </Button>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-400 text-sm">⚠️</span>
              <div>
                <p className="text-yellow-400 font-medium text-sm">
                  Security Notice
                </p>
                <p className="text-gray-300 text-xs mt-1">
                  Jangan bagikan kredensial ini kepada siapa pun. Kredensial ini
                  khusus untuk akun Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
