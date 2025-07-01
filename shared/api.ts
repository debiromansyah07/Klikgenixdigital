/**
 * Shared API types for KlixGenix.ID
 * Types shared between client and server
 */

// Base API response structure
export interface APIResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

// User related types
export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  plan?: string;
  planExpiry?: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
  expiresIn: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  agreeTerms: boolean;
  agreeMarketing?: boolean;
}

// Payment related types
export interface PaymentRequest {
  plan: string;
  paymentMethod: "card" | "bank" | "ewallet";
  fullName: string;
  email: string;
  phone: string;
  // Card payment fields
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardName?: string;
  // Bank transfer fields
  bankAccount?: string;
  // E-wallet fields
  walletPhone?: string;
}

export interface PaymentResponse {
  paymentId: string;
  amount: number;
  plan: string;
  status: "pending" | "processing" | "completed" | "failed";
  paymentMethod: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  redirectUrl?: string;
  qrCode?: string;
  bankInstructions?: {
    bankName: string;
    accountNumber: string;
    amount: number;
    code: string;
  };
}

export interface PaymentHistory {
  id: string;
  amount: number;
  plan: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
  paidAt?: string;
}

// Subscription types
export interface Subscription {
  plan: string;
  startDate: string;
  endDate: string;
  autoRenewal: boolean;
  status: "active" | "cancelled" | "expired";
}

// App usage types
export interface AppUsage {
  app: string;
  action: string;
  time: string;
  icon: string;
}

/**
 * Legacy demo response type
 */
export interface DemoResponse {
  message: string;
}
