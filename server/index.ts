import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleRegister,
  handleLogin,
  handleLogout,
  handleGetProfile,
} from "./routes/auth";
import {
  handleCreatePayment,
  handleVerifyPayment,
  handleGetPaymentHistory,
  handleCancelSubscription,
} from "./routes/payment";
import {
  handleGetProfile,
  handleUpdateProfile,
  handleUploadAvatar,
  handleGetNotificationSettings,
  handleUpdateNotificationSettings,
  handleChangePassword,
  handleGetDashboardStats,
} from "./routes/profile";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from KlixGenix.ID API server!" });
  });

  app.get("/api/demo", handleDemo);

  // Authentication routes
  app.post("/api/auth/register", handleRegister);
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/logout", handleLogout);
  app.get("/api/auth/profile", handleGetProfile);

  // Payment routes
  app.post("/api/payment/create", handleCreatePayment);
  app.get("/api/payment/verify/:paymentId", handleVerifyPayment);
  app.get("/api/payment/history", handleGetPaymentHistory);
  app.post("/api/payment/cancel-subscription", handleCancelSubscription);

  // Profile routes
  app.get("/api/profile", handleGetProfile);
  app.put("/api/profile", handleUpdateProfile);
  app.post("/api/profile/avatar", handleUploadAvatar);
  app.get("/api/profile/notifications", handleGetNotificationSettings);
  app.put("/api/profile/notifications", handleUpdateNotificationSettings);
  app.post("/api/profile/change-password", handleChangePassword);
  app.get("/api/dashboard/stats", handleGetDashboardStats);

  return app;
}
