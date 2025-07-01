// Support contact utilities for KlixGenix.ID

// Contact information
export const supportContacts = {
  whatsapp: {
    number: "+6281234567890", // Replace with actual WhatsApp number
    message: "Halo KlixGenix.ID Support, saya butuh bantuan mengenai:",
  },
  email: {
    address: "support@klixgenix.id",
    subject: "KlixGenix.ID Support Request",
  },
  livechat: {
    tawkToId: "your-tawk-to-id", // Replace with actual Tawk.to ID
    zendeskKey: "your-zendesk-key", // Replace with actual Zendesk key
  },
};

// WhatsApp support functions
export const openWhatsAppSupport = (customMessage?: string) => {
  const message = customMessage || supportContacts.whatsapp.message;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${supportContacts.whatsapp.number.replace(/\+/g, "")}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
};

// Email support functions
export const openEmailSupport = (customSubject?: string) => {
  const subject = customSubject || supportContacts.email.subject;
  const encodedSubject = encodeURIComponent(subject);
  const emailUrl = `mailto:${supportContacts.email.address}?subject=${encodedSubject}`;

  window.open(emailUrl, "_self");
};

// Live chat functions
export const initializeLiveChat = () => {
  // Tawk.to implementation
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://embed.tawk.to/your-tawk-to-id/default";
  script.charset = "UTF-8";
  script.setAttribute("crossorigin", "*");
  document.head.appendChild(script);
};

export const openLiveChat = () => {
  // Check if Tawk.to is available
  if (typeof (window as any).Tawk_API !== "undefined") {
    (window as any).Tawk_API.maximize();
  } else {
    // Fallback to WhatsApp if live chat is not available
    openWhatsAppSupport("Saya ingin live chat dengan support KlixGenix.ID");
  }
};

// Generic support contact function
export const contactSupport = (
  method: "whatsapp" | "email" | "livechat",
  message?: string,
) => {
  switch (method) {
    case "whatsapp":
      openWhatsAppSupport(message);
      break;
    case "email":
      openEmailSupport(message);
      break;
    case "livechat":
      openLiveChat();
      break;
    default:
      console.error("Invalid support method");
  }
};

// Upgrade plan functions
export const upgradeUserPlan = (currentPlan: string, targetPlan?: string) => {
  const planHierarchy = {
    EDUCATION: 1,
    PREMIUM: 2,
    EXCLUSIVE: 3,
  };

  const currentLevel =
    planHierarchy[currentPlan as keyof typeof planHierarchy] || 1;

  // Determine next upgrade
  let upgradePlan = targetPlan;
  if (!upgradePlan) {
    if (currentPlan === "EDUCATION") upgradePlan = "premium";
    else if (currentPlan === "PREMIUM") upgradePlan = "exclusive";
    else upgradePlan = "exclusive"; // Default to highest plan
  }

  // Redirect to payment page with upgrade parameters
  const upgradeUrl = `/payment?plan=${upgradePlan}&upgrade=true&from=${currentPlan.toLowerCase()}`;
  window.location.href = upgradeUrl;
};

// Plan comparison data
export const planComparison = {
  EDUCATION: {
    name: "EDUCATION",
    price: 69000,
    features: ["Extension Browser", "15+ Educational Apps", "Student Support"],
    upgradeOptions: ["PREMIUM", "EXCLUSIVE"],
  },
  PREMIUM: {
    name: "PREMIUM",
    price: 49000,
    features: ["Extension Browser", "50+ Premium Apps", "Priority Support"],
    upgradeOptions: ["EXCLUSIVE"],
  },
  EXCLUSIVE: {
    name: "EXCLUSIVE",
    price: 99000,
    features: [
      "Direct Credentials",
      "All Premium + Exclusive Apps",
      "24/7 VIP Support",
    ],
    upgradeOptions: [],
  },
};

// Get upgrade benefits
export const getUpgradeBenefits = (fromPlan: string, toPlan: string) => {
  const from = planComparison[fromPlan as keyof typeof planComparison];
  const to = planComparison[toPlan as keyof typeof planComparison];

  if (!from || !to) return [];

  // Mock upgrade benefits - in real app, this would come from database
  const benefits = {
    "EDUCATION->PREMIUM": [
      "35+ additional premium apps",
      "Faster extension performance",
      "Priority customer support",
      "Access to productivity tools",
    ],
    "EDUCATION->EXCLUSIVE": [
      "All Premium benefits",
      "Direct username/password access",
      "Exclusive streaming services",
      "VIP 24/7 support",
      "No extension required",
    ],
    "PREMIUM->EXCLUSIVE": [
      "Direct username/password access",
      "15+ exclusive premium apps",
      "VIP support upgrade",
      "No extension dependency",
      "Advanced streaming services",
    ],
  };

  const key = `${fromPlan}->${toPlan}` as keyof typeof benefits;
  return benefits[key] || [];
};
