import { useState } from "react";
import { Button } from "@/components/ui/button";
import { openWhatsAppSupport } from "@/lib/support";

export default function NotificationModal() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="glass-morphism rounded-xl p-6 max-w-sm mx-auto shadow-2xl border border-primary/20">
        <div className="text-center">
          <div className="text-2xl mb-3">🎉</div>
          <h3 className="text-white font-semibold mb-2">
            Promo Spesial Hari Ini!
          </h3>
          <p className="text-gray-200 text-sm mb-4">
            Hemat 30% untuk semua paket langganan. Terbatas hanya hari ini!
          </p>
          <div className="flex space-x-2">
            <Button
              size="sm"
              className="gradient-primary text-white font-medium text-xs"
              onClick={() => {
                setIsVisible(false);
                window.location.href = "/#pricing";
              }}
            >
              Lihat Promo
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-300 hover:text-white text-xs"
              onClick={() => setIsVisible(false)}
            >
              Nanti
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
