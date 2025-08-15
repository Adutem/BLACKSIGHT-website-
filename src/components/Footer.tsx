import React from "react";
import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

interface LinkItem {
  label: string;
  href: string;
}

interface LinkListProps {
  title: string;
  links: LinkItem[];
}

const LinkList: React.FC<LinkListProps> = ({ title, links }) => (
  <div className="flex flex-col">
    <h4 className="font-bold mb-3 text-sm text-gray-800">{title}</h4>
    <ul className="space-y-2 text-sm">
      {links.map((link) => (
        <li key={link.label} className="flex items-center">
          <span className="text-xs mr-2 text-gray-600">✓</span>
          <a
            href={link.href}
            className="text-gray-700 hover:text-blue-500 transition-colors"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer: React.FC = () => {
  const quickLinks: LinkItem[] = [
    { label: "Overview", href: "/overview" },
    { label: "Products", href: "/products" },
    { label: "Pricing", href: "/pricing" },
    { label: "Terms of use", href: "/terms" },
  ];

  const companyLinks: LinkItem[] = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQs", href: "/faqs" },
  ];

  const resourceLinks: LinkItem[] = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Help center", href: "/help" },
  ];

  const socialLinks = [
    { href: "https://instagram.com/", label: "Instagram", Icon: FaInstagram },
    { href: "https://linkedin.com/company/", label: "LinkedIn", Icon: FaLinkedinIn },
    { href: "https://facebook.com/", label: "Facebook", Icon: FaFacebookF },
    { href: "https://x.com/", label: "X", Icon: RiTwitterXFill },
  ];

  return (
    <footer
      className="bg-white py-8"
      style={{
        backgroundImage: "url('./assets/footer-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Upper Footer Section */}
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:items-start mb-6">
          {/* Left Side - Brand Identity */}
          <div className="flex items-start gap-4 mt-4 lg:mt-0 justify-start w-full lg:w-auto">
            <img
              src="./assets/hbackground.svg"
              alt="BlackSight"
              className="h-24 object-contain"
            />
          </div>

          {/* Middle Section - Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-9 items-start justify-start w-full lg:w-auto">
            <LinkList title="Quick Links" links={quickLinks} />
            <LinkList title="Company" links={companyLinks} />
            <LinkList title="Resources" links={resourceLinks} />
          </div>

          {/* Right Side - Social Media */}
          <div className="flex items-start sm:w-full justify-start mt-6 lg:mt-0 w-full lg:w-auto">
            <div className="flex gap-4 sm:gap-10 text-center">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  className="flex flex-col items-center text-blue-500 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6 mb-1" />
                  <span className="text-xs sm:text-sm text-gray-700">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-black mb-6"></div>

        {/* Lower Footer Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="text-sm text-black-600 text-center sm:text-left mb-2 sm:mb-0">
            <p>Automate your business with the smart Blacksight AI for Business</p>
            <p>Unlock your Business full Potential today</p>
          </div>
          <div className="text-sm text-black-600 text-center sm:text-right">
            © Copyright Reserved 2025 | Adutem Innovations
          </div>
        </div>
      </div>
    </footer>
  );
};
