import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, Leaf, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "../types";

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catDropdown, setCatDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setCatDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = (active: boolean) =>
    `px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-secondary hover:text-secondary-foreground ${
      active ? "text-primary bg-secondary" : "text-muted-foreground"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-card/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img
              src="/assets/generated/ayurglow-logo-transparent.dim_400x400.png"
              alt="AyurGlow Secrets Logo"
              className="h-10 w-10 object-contain"
            />
            <span
              className="font-display font-bold text-lg hidden sm:block"
              style={{ color: "oklch(0.28 0.09 190)" }}
            >
              AyurGlow Secrets
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/" className={navLinkClass(location.pathname === "/")}>
              Home
            </Link>
            <Link to="/blog" className={navLinkClass(isActive("/blog"))}>
              Blog
            </Link>

            {/* Categories dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-secondary hover:text-secondary-foreground ${
                  isActive("/category")
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setCatDropdown(!catDropdown)}
              >
                Categories
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${catDropdown ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {catDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-52 rounded-xl border border-border bg-card shadow-card-hover z-50 overflow-hidden py-1"
                  >
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        to="/category/$slug"
                        params={{ slug: cat.slug }}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                        onClick={() => setCatDropdown(false)}
                      >
                        <span className="text-base">{cat.icon}</span>
                        <span>{cat.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/about" className={navLinkClass(isActive("/about"))}>
              About
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link to="/admin" className="hidden sm:block">
              <Button
                variant="outline"
                size="sm"
                className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Leaf className="h-3.5 w-3.5 mr-1.5" />
                Admin
              </Button>
            </Link>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden lg:hidden border-t border-border/60 bg-card"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              <Link
                to="/"
                className="px-3 py-2.5 text-sm font-medium rounded-md hover:bg-secondary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/blog"
                className="px-3 py-2.5 text-sm font-medium rounded-md hover:bg-secondary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Blog
              </Link>
              <div className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Categories
              </div>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  to="/category/$slug"
                  params={{ slug: cat.slug }}
                  className="pl-5 pr-3 py-2 text-sm font-medium rounded-md hover:bg-secondary transition-colors flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </Link>
              ))}
              <Link
                to="/about"
                className="px-3 py-2.5 text-sm font-medium rounded-md hover:bg-secondary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
              <div className="pt-2 border-t border-border/60 mt-2">
                <Link to="/admin" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-primary/30 text-primary"
                  >
                    <Leaf className="h-3.5 w-3.5 mr-1.5" />
                    Admin Panel
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
