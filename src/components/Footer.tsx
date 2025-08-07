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
    <h4 className="font-bold mb-2 sm:mb-4 text-sm sm:text-base text-black">{title}</h4>
    <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
      {links.map((link) => (
        <li key={link.label} className="flex items-center">
          <span className="text-xs mr-1 sm:mr-2">›</span>
          <a href={link.href} className="text-black hover:text-blue-500 transition-colors">
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
    { href: "https://instagram.com/blacksight", label: "Instagram", Icon: FaInstagram },
    { href: "https://linkedin.com/company/blacksight", label: "LinkedIn", Icon: FaLinkedinIn },
    { href: "https://facebook.com/blacksight", label: "Facebook", Icon: FaFacebookF },
    { href: "https://x.com/blacksight", label: "X", Icon: RiTwitterXFill },
  ];

  return (
    <footer className="border-t border-gray-200 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Column 1 - Logo and Tagline */}
          <div className="mb-4 sm:mb-0">
            <div className="mb-2 sm:mb-4">
              <img
                src="/images/Logo.jpg"
                alt="BlackSight"
                className="h-6 sm:h-8 w-auto"
              />
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <LinkList title="Quick Links" links={quickLinks} />

          {/* Column 3 - Company */}
          <LinkList title="Company" links={companyLinks} />

          {/* Column 4 - Resources and Social */}
          <div className="mb-4 sm:mb-0">
            <LinkList title="Resources" links={resourceLinks} />
            
            <div className="mt-2 sm:mt-4 flex space-x-2 sm:space-x-3">
              {socialLinks.map(({ href, Icon }) => (
                <a 
                  key={href} 
                  href={href} 
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Icon className="h-4 sm:h-5 w-4 sm:w-5" />
                </a>
              ))}
            </div>
            <div className="mt-1 sm:mt-2 text-xs text-gray-500 space-x-1 sm:space-x-1">
              <span>Instagram</span>
              <span>|</span>
              <span>LinkedIn</span>
              <span>|</span>
              <span>Facebook</span>
              <span>|</span>
              <span>X</span>
            </div>
          </div>
        </div>

        {/* Bottom area with tagline and copyright */}
        <div className="mt-4 sm:mt-6 pt-2 sm:pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-xs text-gray-500 mb-2 sm:mb-0">
            <p>Automate your business with the smart BlackSight AI for Business</p>
            <p>Unlock your business full potential today</p>
          </div>
          <div className="text-xs text-gray-500">
            © Copyright Reserved 2025 | Adutem Innovations
          </div>
        </div>
      </div>
    </footer>
  );
};