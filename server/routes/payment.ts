import { RequestHandler } from "express";

// Create payment intent
export const handleCreatePayment: RequestHandler = async (req, res) => {
  try {
    const {
      plan,
      paymentMethod,
      fullName,
      email,
      phone,
      // Card details
      cardNumber,
      expiryDate,
      cvv,
      cardName,
      // Bank details
      bankAccount,
      // E-wallet details
      walletPhone,
    } = req.body;

    // Validate required fields
    if (!plan || !paymentMethod || !fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    // Plan pricing
    const planPricing = {
      premium: { price: 49000, name: "PREMIUM" },
      exclusive: { price: 99000, name: "EXCLUSIVE" },
      education: { price: 69000, name: "EDUCATION" },
    };

    const selectedPlan = planPricing[plan as keyof typeof planPricing];
    if (!selectedPlan) {
      return res.status(400).json({
        success: false,
        message: "Paket tidak valid",
      });
    }

    // Validate payment method specific fields
    if (paymentMethod === "card") {
      if (!cardNumber || !expiryDate || !cvv || !cardName) {
        return res.status(400).json({
          success: false,
          message: "Detail kartu kredit tidak lengkap",
        });
      }
    } else if (paymentMethod === "ewallet") {
      if (!walletPhone) {
        return res.status(400).json({
          success: false,
          message: "Nomor telepon e-wallet wajib diisi",
        });
      }
    }

    // Generate payment ID
    const paymentId = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // TODO: Integrate with actual payment gateway (Midtrans, Xendit, etc.)
    // TODO: Store payment record in database
    // TODO: Send payment confirmation email

    // Simulate payment processing
    const paymentResponse = {
      success: true,
      message: "Payment initiated successfully",
      data: {
        paymentId,
        amount: selectedPlan.price,
        plan: selectedPlan.name,
        status: "pending",
        paymentMethod,
        customer: {
          name: fullName,
          email,
          phone,
        },
        // Different response based on payment method
        ...(paymentMethod === "card" && {
          redirectUrl: null, // For direct card payment
          status: "processing",
        }),
        ...(paymentMethod === "bank" && {
          bankInstructions: {
            bankName: "BCA",
            accountNumber: "1234567890",
            amount: selectedPlan.price,
            code: paymentId,
          },
        }),
        ...(paymentMethod === "ewallet" && {
          redirectUrl: `https://payment-gateway.com/pay/${paymentId}`,
          qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${paymentId}`,
        }),
      },
    };

    res.status(201).json(paymentResponse);
  } catch (error) {
    console.error("Payment creation error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// Verify payment status
export const handleVerifyPayment: RequestHandler = async (req, res) => {
  try {
    const { paymentId } = req.params;

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: "Payment ID diperlukan",
      });
    }

    // TODO: Check payment status from payment gateway
    // TODO: Update subscription status in database
    // TODO: Send success notification

    // Simulate payment verification
    res.json({
      success: true,
      data: {
        paymentId,
        status: "completed",
        paidAt: new Date().toISOString(),
        subscription: {
          plan: "PREMIUM",
          startDate: new Date().toISOString(),
          endDate: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          ).toISOString(), // 30 days
          autoRenewal: true,
        },
      },
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// Get payment history
export const handleGetPaymentHistory: RequestHandler = async (req, res) => {
  try {
    // TODO: Get user ID from JWT token
    // TODO: Fetch payment history from database

    res.json({
      success: true,
      data: [
        {
          id: "PAY_001",
          amount: 49000,
          plan: "PREMIUM",
          status: "completed",
          paymentMethod: "card",
          createdAt: "2024-11-15T00:00:00Z",
          paidAt: "2024-11-15T00:05:00Z",
        },
        {
          id: "PAY_002",
          amount: 49000,
          plan: "PREMIUM",
          status: "completed",
          paymentMethod: "ewallet",
          createdAt: "2024-10-15T00:00:00Z",
          paidAt: "2024-10-15T00:02:00Z",
        },
      ],
    });
  } catch (error) {
    console.error("Get payment history error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// Cancel subscription
export const handleCancelSubscription: RequestHandler = async (req, res) => {
  try {
    // TODO: Get user ID from JWT token
    // TODO: Cancel subscription in database
    // TODO: Send cancellation confirmation email

    res.json({
      success: true,
      message: "Langganan berhasil dibatalkan",
      data: {
        cancelledAt: new Date().toISOString(),
        refundAmount: 0, // No refund for immediate cancellation
        accessUntil: "2024-12-15T23:59:59Z", // Access until current period ends
      },
    });
  } catch (error) {
    console.error("Cancel subscription error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};
