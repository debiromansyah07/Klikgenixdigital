import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface NotificationSettings {
  emailNotifications: {
    productUpdates: boolean;
    securityAlerts: boolean;
    paymentReminders: boolean;
    promotions: boolean;
    newsletter: boolean;
  };
  pushNotifications: {
    appUpdates: boolean;
    accountActivity: boolean;
    maintenanceAlerts: boolean;
    newFeatures: boolean;
  };
  smsNotifications: {
    securityAlerts: boolean;
    paymentAlerts: boolean;
    emergencyOnly: boolean;
  };
  preferences: {
    frequency: string;
    quietHours: boolean;
    quietStart: string;
    quietEnd: string;
  };
}

export default function NotificationSettings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: {
      productUpdates: true,
      securityAlerts: true,
      paymentReminders: true,
      promotions: false,
      newsletter: false,
    },
    pushNotifications: {
      appUpdates: true,
      accountActivity: true,
      maintenanceAlerts: true,
      newFeatures: false,
    },
    smsNotifications: {
      securityAlerts: true,
      paymentAlerts: true,
      emergencyOnly: false,
    },
    preferences: {
      frequency: "daily",
      quietHours: false,
      quietStart: "22:00",
      quietEnd: "08:00",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Load user notification settings
  useEffect(() => {
    // TODO: Load from Supabase
    // const { data, error } = await supabase
    //   .from('user_notification_settings')
    //   .select('*')
    //   .eq('user_id', user.id)
    //   .single()
  }, [user]);

  const handleSwitchChange = (
    category: keyof NotificationSettings,
    setting: string,
    value: boolean,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      // TODO: Save to Supabase
      // const { error } = await supabase
      //   .from('user_notification_settings')
      //   .upsert({
      //     user_id: user.id,
      //     ...settings,
      //     updated_at: new Date().toISOString()
      //   })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Settings Saved",
        description: "Your notification preferences have been updated.",
      });

      setHasChanges(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: "Failed to save notification settings. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSettings({
      emailNotifications: {
        productUpdates: true,
        securityAlerts: true,
        paymentReminders: true,
        promotions: false,
        newsletter: false,
      },
      pushNotifications: {
        appUpdates: true,
        accountActivity: true,
        maintenanceAlerts: true,
        newFeatures: false,
      },
      smsNotifications: {
        securityAlerts: true,
        paymentAlerts: true,
        emergencyOnly: false,
      },
      preferences: {
        frequency: "daily",
        quietHours: false,
        quietStart: "22:00",
        quietEnd: "08:00",
      },
    });
    setHasChanges(true);
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
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="glass-morphism border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-3">
                <span className="text-2xl">🔔</span>
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Email Notifications */}
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                  <span>📧</span>
                  Email Notifications
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      key: "productUpdates",
                      label: "Product Updates",
                      desc: "New features and improvements",
                    },
                    {
                      key: "securityAlerts",
                      label: "Security Alerts",
                      desc: "Important security notifications",
                    },
                    {
                      key: "paymentReminders",
                      label: "Payment Reminders",
                      desc: "Billing and payment notifications",
                    },
                    {
                      key: "promotions",
                      label: "Promotions",
                      desc: "Special offers and discounts",
                    },
                    {
                      key: "newsletter",
                      label: "Newsletter",
                      desc: "Weekly newsletter and updates",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                    >
                      <div className="space-y-1">
                        <Label className="text-white font-medium">
                          {item.label}
                        </Label>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                      <Switch
                        checked={
                          settings.emailNotifications[
                            item.key as keyof typeof settings.emailNotifications
                          ]
                        }
                        onCheckedChange={(checked) =>
                          handleSwitchChange(
                            "emailNotifications",
                            item.key,
                            checked,
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-white/10" />

              {/* Push Notifications */}
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                  <span>📱</span>
                  Push Notifications
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      key: "appUpdates",
                      label: "App Updates",
                      desc: "Extension and app updates",
                    },
                    {
                      key: "accountActivity",
                      label: "Account Activity",
                      desc: "Login and account changes",
                    },
                    {
                      key: "maintenanceAlerts",
                      label: "Maintenance Alerts",
                      desc: "Scheduled maintenance notifications",
                    },
                    {
                      key: "newFeatures",
                      label: "New Features",
                      desc: "When new apps are added",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                    >
                      <div className="space-y-1">
                        <Label className="text-white font-medium">
                          {item.label}
                        </Label>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                      <Switch
                        checked={
                          settings.pushNotifications[
                            item.key as keyof typeof settings.pushNotifications
                          ]
                        }
                        onCheckedChange={(checked) =>
                          handleSwitchChange(
                            "pushNotifications",
                            item.key,
                            checked,
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-white/10" />

              {/* SMS Notifications */}
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                  <span>💬</span>
                  SMS Notifications
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      key: "securityAlerts",
                      label: "Security Alerts",
                      desc: "Critical security notifications",
                    },
                    {
                      key: "paymentAlerts",
                      label: "Payment Alerts",
                      desc: "Payment confirmations and failures",
                    },
                    {
                      key: "emergencyOnly",
                      label: "Emergency Only",
                      desc: "Only critical system alerts",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                    >
                      <div className="space-y-1">
                        <Label className="text-white font-medium">
                          {item.label}
                        </Label>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                      <Switch
                        checked={
                          settings.smsNotifications[
                            item.key as keyof typeof settings.smsNotifications
                          ]
                        }
                        onCheckedChange={(checked) =>
                          handleSwitchChange(
                            "smsNotifications",
                            item.key,
                            checked,
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-white/10" />

              {/* Preferences */}
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                  <span>⚙️</span>
                  Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="space-y-1">
                      <Label className="text-white font-medium">
                        Quiet Hours
                      </Label>
                      <p className="text-gray-400 text-sm">
                        Disable notifications during specified hours
                      </p>
                    </div>
                    <Switch
                      checked={settings.preferences.quietHours}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("preferences", "quietHours", checked)
                      }
                    />
                  </div>

                  {settings.preferences.quietHours && (
                    <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg">
                      <div className="space-y-2">
                        <Label className="text-white text-sm">Start Time</Label>
                        <input
                          type="time"
                          value={settings.preferences.quietStart}
                          onChange={(e) =>
                            handleSwitchChange(
                              "preferences",
                              "quietStart",
                              e.target.value as any,
                            )
                          }
                          className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white text-sm">End Time</Label>
                        <input
                          type="time"
                          value={settings.preferences.quietEnd}
                          onChange={(e) =>
                            handleSwitchChange(
                              "preferences",
                              "quietEnd",
                              e.target.value as any,
                            )
                          }
                          className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6">
                <Button
                  onClick={handleSave}
                  disabled={!hasChanges || isLoading}
                  className="flex-1 gradient-primary text-white font-semibold"
                >
                  {isLoading ? "Saving..." : "Save Settings"}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Reset to Default
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
                      Notification preferences will be stored in Supabase
                      database with real-time sync.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
