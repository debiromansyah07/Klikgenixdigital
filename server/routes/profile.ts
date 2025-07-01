import { RequestHandler } from "express";

// Get user profile
export const handleGetProfile: RequestHandler = async (req, res) => {
  try {
    // TODO: Get user ID from JWT token
    const userId = req.headers.authorization?.split(" ")[1] || "demo-user";

    // TODO: Integrate with Supabase
    // const { data, error } = await supabase
    //   .from('user_profiles')
    //   .select('*')
    //   .eq('user_id', userId)
    //   .single()

    // Mock response
    const mockProfile = {
      user_id: userId,
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+62 812-3456-7890",
      avatar: "",
      bio: "Premium user since 2024",
      location: "Jakarta, Indonesia",
      website: "https://johndoe.com",
      plan: "PREMIUM",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: mockProfile,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// Update user profile
export const handleUpdateProfile: RequestHandler = async (req, res) => {
  try {
    const userId = req.headers.authorization?.split(" ")[1] || "demo-user";
    const { fullName, phone, bio, location, website } = req.body;

    // Validate required fields
    if (!fullName) {
      return res.status(400).json({
        success: false,
        message: "Nama lengkap wajib diisi",
      });
    }

    // TODO: Integrate with Supabase
    // const { data, error } = await supabase
    //   .from('user_profiles')
    //   .upsert({
    //     user_id: userId,
    //     full_name: fullName,
    //     phone,
    //     bio,
    //     location,
    //     website,
    //     updated_at: new Date().toISOString()
    //   })
    //   .select()
    //   .single()

    // Mock response
    const updatedProfile = {
      user_id: userId,
      fullName,
      phone,
      bio,
      location,
      website,
      updated_at: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: updatedProfile,
      message: "Profile berhasil diperbarui",
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// Upload avatar
export const handleUploadAvatar: RequestHandler = async (req, res) => {
  try {
    const userId = req.headers.authorization?.split(" ")[1] || "demo-user";

    // TODO: Handle file upload with multer
    // TODO: Upload to Supabase Storage
    // const file = req.file
    // const fileExt = file.originalname.split('.').pop()
    // const fileName = `${userId}-${Date.now()}.${fileExt}`
    // const filePath = `avatars/${fileName}`

    // const { data, error } = await supabase.storage
    //   .from('avatars')
    //   .upload(filePath, file.buffer)

    // Mock response
    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${userId}`;

    res.json({
      success: true,
      data: {
        avatar_url: avatarUrl,
      },
      message: "Avatar berhasil diupload",
    });
  } catch (error) {
    console.error("Upload avatar error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// Get notification settings
export const handleGetNotificationSettings: RequestHandler = async (
  req,
  res,
) => {
  try {
    const userId = req.headers.authorization?.split(" ")[1] || "demo-user";

    // TODO: Integrate with Supabase
    // const { data, error } = await supabase
    //   .from('notification_settings')
    //   .select('*')
    //   .eq('user_id', userId)
    //   .single()

    // Mock response
    const mockSettings = {
      user_id: userId,
      email_notifications: {
        productUpdates: true,
        securityAlerts: true,
        paymentReminders: true,
        promotions: false,
        newsletter: false,
      },
      push_notifications: {
        appUpdates: true,
        accountActivity: true,
        maintenanceAlerts: true,
        newFeatures: false,
      },
      sms_notifications: {
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
      updated_at: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: mockSettings,
    });
  } catch (error) {
    console.error("Get notification settings error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// Update notification settings
export const handleUpdateNotificationSettings: RequestHandler = async (
  req,
  res,
) => {
  try {
    const userId = req.headers.authorization?.split(" ")[1] || "demo-user";
    const settings = req.body;

    // TODO: Integrate with Supabase
    // const { data, error } = await supabase
    //   .from('notification_settings')
    //   .upsert({
    //     user_id: userId,
    //     ...settings,
    //     updated_at: new Date().toISOString()
    //   })
    //   .select()
    //   .single()

    res.json({
      success: true,
      data: settings,
      message: "Pengaturan notifikasi berhasil diperbarui",
    });
  } catch (error) {
    console.error("Update notification settings error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// Change password
export const handleChangePassword: RequestHandler = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate required fields
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Password lama dan baru wajib diisi",
      });
    }

    // Validate password strength
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password harus minimal 8 karakter dengan huruf besar, kecil, angka, dan simbol",
      });
    }

    // TODO: Integrate with Supabase Auth
    // const { error } = await supabase.auth.updateUser({
    //   password: newPassword
    // })

    // if (error) {
    //   return res.status(400).json({
    //     success: false,
    //     message: error.message
    //   })
    // }

    res.json({
      success: true,
      message: "Password berhasil diubah",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// Get dashboard stats
export const handleGetDashboardStats: RequestHandler = async (req, res) => {
  try {
    const userId = req.headers.authorization?.split(" ")[1] || "demo-user";

    // TODO: Get real stats from Supabase
    // Get subscription info, usage stats, payment history, etc.

    // Mock response
    const mockStats = {
      user: {
        id: userId,
        fullName: "John Doe",
        email: "john@example.com",
        plan: "PREMIUM",
        planExpiry: "2024-12-15",
      },
      subscription: {
        plan: "PREMIUM",
        status: "active",
        nextBilling: "2024-12-15",
        autoRenewal: true,
      },
      usage: {
        totalApps: 50,
        usedApps: 15,
        usageQuota: 75,
        monthlyUsage: [
          { month: "Oct", usage: 45 },
          { month: "Nov", usage: 75 },
          { month: "Dec", usage: 60 },
        ],
      },
      recentActivity: [
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
      ],
    };

    res.json({
      success: true,
      data: mockStats,
    });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};
