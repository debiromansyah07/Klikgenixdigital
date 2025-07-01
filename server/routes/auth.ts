import { RequestHandler } from "express";

// Register endpoint
export const handleRegister: RequestHandler = async (req, res) => {
  try {
    const { fullName, email, password, phone, agreeTerms } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !phone || !agreeTerms) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi dan setujui syarat & ketentuan",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Format email tidak valid",
      });
    }

    // Password validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password minimal 8 karakter",
      });
    }

    // TODO: Check if email already exists in database
    // TODO: Hash password before storing
    // TODO: Save user to database
    // TODO: Send welcome email

    // Simulate success response
    res.status(201).json({
      success: true,
      message: "Akun berhasil dibuat",
      data: {
        id: Math.random().toString(36).substr(2, 9),
        fullName,
        email,
        phone,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// Login endpoint
export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan password wajib diisi",
      });
    }

    // TODO: Check user in database
    // TODO: Verify password hash
    // TODO: Generate JWT token
    // TODO: Set session/cookie if rememberMe is true

    // Simulate success response
    res.json({
      success: true,
      message: "Login berhasil",
      data: {
        user: {
          id: "user123",
          fullName: "John Doe",
          email,
          plan: "PREMIUM",
        },
        token: "jwt-token-here",
        expiresIn: rememberMe ? "30d" : "24h",
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// Logout endpoint
export const handleLogout: RequestHandler = async (req, res) => {
  try {
    // TODO: Invalidate JWT token
    // TODO: Clear session/cookies

    res.json({
      success: true,
      message: "Logout berhasil",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// Get user profile
export const handleGetProfile: RequestHandler = async (req, res) => {
  try {
    // TODO: Get user ID from JWT token
    // TODO: Fetch user data from database

    res.json({
      success: true,
      data: {
        id: "user123",
        fullName: "John Doe",
        email: "john@example.com",
        phone: "+62 812-3456-7890",
        plan: "PREMIUM",
        planExpiry: "2024-12-15",
        createdAt: "2024-01-15T00:00:00Z",
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};
