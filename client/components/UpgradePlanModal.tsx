import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  upgradeUserPlan,
  getUpgradeBenefits,
  planComparison,
} from "@/lib/support";

interface UpgradePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: string;
  onUpgrade?: (targetPlan: string) => void;
}

export default function UpgradePlanModal({
  isOpen,
  onClose,
  currentPlan,
  onUpgrade,
}: UpgradePlanModalProps) {
  const currentPlanData =
    planComparison[currentPlan as keyof typeof planComparison];
  const upgradeOptions = currentPlanData?.upgradeOptions || [];

  const handleUpgrade = (targetPlan: string) => {
    if (onUpgrade) {
      onUpgrade(targetPlan);
    } else {
      upgradeUserPlan(currentPlan, targetPlan.toLowerCase());
    }
    onClose();
  };

  if (!currentPlanData || upgradeOptions.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="glass-morphism border-white/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-xl flex items-center gap-3">
              <span className="text-2xl">💎</span>
              Already at Premium!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <p className="text-gray-300 mb-4">
              You're already on the highest plan available. Enjoy all premium
              features!
            </p>
            <Button onClick={onClose} className="gradient-primary text-white">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-morphism border-white/20 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl flex items-center gap-3">
            <span className="text-2xl">⬆️</span>
            Upgrade Your Plan
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Current plan: {currentPlanData.name} • Choose your upgrade
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Plan Summary */}
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold">Current Plan</h3>
              <Badge className="bg-blue-600 text-white">
                {currentPlanData.name}
              </Badge>
            </div>
            <p className="text-gray-300 text-sm">
              Rp{currentPlanData.price.toLocaleString()}/month •{" "}
              {currentPlanData.features.join(", ")}
            </p>
          </div>

          {/* Upgrade Options */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">
              Available Upgrades
            </h3>

            {upgradeOptions.map((planName) => {
              const plan =
                planComparison[planName as keyof typeof planComparison];
              const benefits = getUpgradeBenefits(currentPlan, planName);
              const savings = Math.round(
                (1 - plan.price / (currentPlanData.price * 2)) * 100,
              );

              return (
                <div
                  key={planName}
                  className="glass-morphism border-white/20 rounded-lg p-6 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-white font-bold text-xl">
                          {plan.name}
                        </h4>
                        {planName === "EXCLUSIVE" && (
                          <Badge className="bg-purple-600 text-white">
                            Most Popular
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-2xl font-bold text-white">
                          Rp{plan.price.toLocaleString()}
                        </span>
                        <span className="text-gray-400">/month</span>
                        {savings > 0 && (
                          <Badge
                            variant="outline"
                            className="border-green-500 text-green-400"
                          >
                            Save {savings}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleUpgrade(planName)}
                      className={`${
                        planName === "EXCLUSIVE"
                          ? "gradient-primary"
                          : "bg-primary hover:bg-primary/90"
                      } text-white font-semibold px-6`}
                    >
                      Upgrade Now
                    </Button>
                  </div>

                  {/* Upgrade Benefits */}
                  <div className="space-y-3">
                    <h5 className="text-white font-medium">What you'll get:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <span className="text-green-400">✅</span>
                          <span className="text-gray-200 text-sm">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Plan Features */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-gray-400 text-sm">
                      Access method: {plan.features[0]} •{" "}
                      {plan.features.slice(1).join(" • ")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Upgrade Guarantee */}
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <span className="text-green-400">💰</span>
              <div>
                <p className="text-green-400 font-medium text-sm">
                  Upgrade Guarantee
                </p>
                <p className="text-gray-300 text-xs mt-1">
                  30-day money-back guarantee. If you're not satisfied with your
                  upgrade, we'll refund the difference and downgrade you back.
                </p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
