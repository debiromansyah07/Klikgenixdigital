// API utility functions for KlixGenix.ID

const API_BASE_URL = "/api";

// Generic API call function
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<{ success: boolean; data?: T; message?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "API call failed");
    }

    return result;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
}

// Authentication API calls
export const authAPI = {
  register: async (userData: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    agreeTerms: boolean;
    agreeMarketing?: boolean;
  }) => {
    return apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    return apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  logout: async () => {
    return apiCall("/auth/logout", {
      method: "POST",
    });
  },

  getProfile: async () => {
    return apiCall("/auth/profile", {
      method: "GET",
    });
  },
};

// Payment API calls
export const paymentAPI = {
  createPayment: async (paymentData: {
    plan: string;
    paymentMethod: string;
    fullName: string;
    email: string;
    phone: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    cardName?: string;
    bankAccount?: string;
    walletPhone?: string;
  }) => {
    return apiCall("/payment/create", {
      method: "POST",
      body: JSON.stringify(paymentData),
    });
  },

  verifyPayment: async (paymentId: string) => {
    return apiCall(`/payment/verify/${paymentId}`, {
      method: "GET",
    });
  },

  getPaymentHistory: async () => {
    return apiCall("/payment/history", {
      method: "GET",
    });
  },

  cancelSubscription: async () => {
    return apiCall("/payment/cancel-subscription", {
      method: "POST",
    });
  },
};

// Local storage utilities for authentication
export const authStorage = {
  setToken: (token: string) => {
    localStorage.setItem("klixgenix_token", token);
  },

  getToken: () => {
    return localStorage.getItem("klixgenix_token");
  },

  removeToken: () => {
    localStorage.removeItem("klixgenix_token");
  },

  setUser: (user: any) => {
    localStorage.setItem("klixgenix_user", JSON.stringify(user));
  },

  getUser: () => {
    const user = localStorage.getItem("klixgenix_user");
    return user ? JSON.parse(user) : null;
  },

  removeUser: () => {
    localStorage.removeItem("klixgenix_user");
  },

  isAuthenticated: () => {
    return !!authStorage.getToken();
  },
};

// Error handling utility
export const handleAPIError = (error: any) => {
  if (error.message) {
    return error.message;
  }
  return "Terjadi kesalahan yang tidak diketahui";
};
