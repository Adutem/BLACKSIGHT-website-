import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export const Header: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/pricing", label: "Pricing" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ] as const;

  const baseLink =
    "relative px-2 py-1 text-sm sm:text-base transition-colors duration-200";
  const activeLink =
    "text-[#488ff8] font-semibold after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[2px] after:w-6 after:rounded-full after:bg-[#488ff8]";
  const inactiveLink = "text-gray-700 hover:text-[#488ff8] font-semibold";

  return (
<header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
    
    {/* Logo */}
    <Link to="/" className="flex items-center space-x-2">
      <img
        src="./assets/hbackground.png"
        alt="Blacksight Logo"
        className="h-10 w-auto object-contain"
      />
    </Link>

    {/* Desktop Nav */}
    <nav className="hidden md:flex items-center gap-6">
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          className={({ isActive }) =>
            [
              "text-sm font-medium transition-colors duration-200",
              isActive
                ? "text-[#488ff8]"
                : "text-gray-700 hover:text-[#488ff8]",
            ].join(" ")
          }
        >
          {l.label}
        </NavLink>
      ))}
    </nav>

    {/* Desktop Actions */}
    <div className="hidden sm:flex items-center gap-3">
      <Link to="https://app.blacksight.co/user/signin">
        <button className="rounded-lg bg-[#488ff8] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#3a7ae6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#488ff8]">
          Sign In
        </button>
      </Link>
      <Link to="https://app.blacksight.co/user/signup">
        <button className="rounded-lg bg-white px-5 py-2 text-sm font-medium text-[#488ff8] shadow-sm ring-1 ring-[#488ff8] transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#488ff8]">
          Sign Up
        </button>
      </Link>
    </div>

    {/* Mobile Hamburger */}
    <button
      type="button"
      className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#488ff8]"
      aria-controls="mobile-menu"
      aria-expanded={open}
      onClick={() => setOpen((prev) => !prev)}
    >
      <svg
        className={`h-6 w-6 transition-transform ${open ? "rotate-90" : ""}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        {open ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  </div>

  {/* Mobile Menu */}
  <div
    id="mobile-menu"
    className={[
      "md:hidden overflow-hidden border-t border-gray-100 bg-white",
      "transition-[max-height,opacity] duration-300 ease-in-out",
      open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
    ].join(" ")}
  >
    <nav className="px-4 sm:px-6 py-4 space-y-2">
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          className={({ isActive }) =>
            [
              "block rounded-md px-3 py-2 text-base font-medium transition",
              isActive
                ? "bg-blue-50 text-[#488ff8]"
                : "text-gray-700 hover:bg-gray-50 hover:text-[#488ff8]",
            ].join(" ")
          }
        >
          {l.label}
        </NavLink>
      ))}

      {/* Mobile Actions */}
      <div className="mt-4 flex gap-3">
        <Link to="/signin" className="flex-1">
          <button className="w-full rounded-lg bg-[#488ff8] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#3a7ae6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#488ff8]">
            Sign In
          </button>
        </Link>
        <Link to="/signup" className="flex-1">
          <button className="w-full rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#488ff8] shadow-sm ring-1 ring-[#488ff8] transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#488ff8]">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  </div>
</header>

  );
};

export default Header;
