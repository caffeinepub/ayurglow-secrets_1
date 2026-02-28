import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import {
  SiFacebook,
  SiInstagram,
  SiPinterest,
  SiX,
  SiYoutube,
} from "react-icons/si";
import { CATEGORIES } from "../types";

const socialLinks = [
  { icon: SiFacebook, label: "Facebook", href: "#" },
  { icon: SiInstagram, label: "Instagram", href: "#" },
  { icon: SiX, label: "Twitter / X", href: "#" },
  { icon: SiYoutube, label: "YouTube", href: "#" },
  { icon: SiPinterest, label: "Pinterest", href: "#" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto" style={{ background: "oklch(0.18 0.07 200)" }}>
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-2 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/assets/generated/ayurglow-logo-transparent.dim_400x400.png"
                alt="AyurGlow Secrets"
                className="h-12 w-12 object-contain"
              />
              <span
                className="font-display font-bold text-xl"
                style={{ color: "oklch(0.95 0.01 148)" }}
              >
                AyurGlow Secrets
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: "oklch(0.78 0.05 185)" }}
            >
              AyurGlow Secrets is a wellness platform dedicated to sharing the
              healing power of Ayurveda for a healthier life, glowing skin, and
              stronger hair. Ancient wisdom. Modern living.
            </p>

            {/* Connect With Us */}
            <div>
              <h4
                className="font-display text-sm font-semibold mb-3 uppercase tracking-wider"
                style={{ color: "oklch(0.72 0.14 85)" }}
              >
                Connect With Us
              </h4>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{
                      background: "oklch(0.26 0.07 200)",
                      color: "oklch(0.82 0.05 180)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        "oklch(0.55 0.15 195)";
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "oklch(0.99 0.005 148)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        "oklch(0.26 0.07 200)";
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "oklch(0.82 0.05 180)";
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3
              className="font-display text-base font-semibold mb-5"
              style={{ color: "oklch(0.95 0.01 148)" }}
            >
              Categories
            </h3>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to="/category/$slug"
                    params={{ slug: cat.slug }}
                    className="text-sm flex items-center gap-2 transition-colors"
                    style={{ color: "oklch(0.75 0.05 178)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "oklch(0.72 0.14 85)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "oklch(0.75 0.05 178)";
                    }}
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3
              className="font-display text-base font-semibold mb-5"
              style={{ color: "oklch(0.95 0.01 148)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Home", to: "/" as const },
                { label: "All Articles", to: "/blog" as const },
                { label: "About Us", to: "/about" as const },
                { label: "Admin Panel", to: "/admin" as const },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm flex items-center gap-2 transition-colors"
                    style={{ color: "oklch(0.75 0.05 178)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "oklch(0.72 0.14 85)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "oklch(0.75 0.05 178)";
                    }}
                  >
                    <Leaf className="h-3 w-3 shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t py-4"
        style={{
          borderColor: "oklch(0.28 0.06 200)",
          background: "oklch(0.14 0.05 205)",
        }}
      >
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p style={{ color: "oklch(0.60 0.04 185)" }}>
            © {year} AyurGlow Secrets. All rights reserved.
          </p>
          <p style={{ color: "oklch(0.60 0.04 185)" }}>
            Ancient Ayurvedic Wisdom for Healthy Body, Glowing Skin & Strong
            Hair
          </p>
        </div>
      </div>
    </footer>
  );
}
