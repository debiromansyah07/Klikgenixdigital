export default function Footer() {
  const footerLinks = {
    "Tentang Kami": ["Fitur", "Layanan", "Tentang", "Harga"],
    "Portal Pengguna": ["Unduh Ekstensi", "Akses Dashboard", "FAQ", "Contact"],
    Bantuan: ["Help & Support", "Tutorial", "WhatsApp", "Email Support"],
  };

  const socialLinks = [
    { name: "Instagram", icon: "📷", url: "#" },
    { name: "Twitter", icon: "🐦", url: "#" },
    { name: "Facebook", icon: "📘", url: "#" },
    { name: "YouTube", icon: "📺", url: "#" },
  ];

  return (
    <footer className="bg-card border-t border-white/10">
      <div className="container-padding py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h1 className="text-2xl font-bold text-white mb-4">KlixGenix.ID</h1>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Experience premium together. Akses 50+ aplikasi premium dengan
              satu langganan yang terjangkau dan aman melalui KlixGenix.ID.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title}>
                  <h3 className="text-white font-semibold text-lg mb-4">
                    {title}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link, index) => {
                      // Map specific links to their routes
                      let href = "#";
                      if (link === "FAQ" || link === "Help & Support")
                        href = "/faq";
                      else if (link === "Tentang") href = "/";
                      else if (link === "Kontak" || link === "Contact")
                        href = "/contact";
                      else if (link === "Harga") href = "/#pricing";
                      else if (link === "Akses Dashboard") href = "/dashboard";

                      return (
                        <li key={index}>
                          <a
                            href={href}
                            className="text-gray-300 hover:text-primary transition-colors"
                          >
                            {link}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2024 KlixGenix.ID. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
