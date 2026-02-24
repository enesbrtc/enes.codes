"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "HOME" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/lab", label: "LAB" },
  { href: "/notes", label: "NOTES" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <style>{`
        .navbar-wrapper {
          position: relative;
          margin-bottom: 0.3rem;
          margin-top: 0;
          padding: 0.4rem 0;
          border-top: 1px solid rgba(0, 128, 255, 0.3);
          border-bottom: 1px solid rgba(255, 0, 128, 0.2);
          background: linear-gradient(
            180deg,
            rgba(0, 128, 255, 0.02) 0%,
            rgba(0, 0, 0, 0.02) 100%
          );
          box-shadow: 0 2px 6px rgba(0, 128, 255, 0.08);
        }

        .navbar-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
          padding: 0 0.6rem;
        }

        .navbar-link {
          position: relative;
          padding: 0.35rem 0.8rem;
          font-size: 0.75rem;
          font-weight: 700;
          font-family: 'Courier New', monospace;
          letter-spacing: 0.03em;
          text-decoration: none;
          color: var(--foreground);
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
          background: linear-gradient(135deg, rgba(0, 128, 255, 0.04), rgba(0, 0, 0, 0.05));
          border: 1px solid rgba(0, 128, 255, 0.25);
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.12s ease-out;
          white-space: nowrap;
          box-shadow: 0 2px 4px rgba(0, 128, 255, 0.06);
        }

        .navbar-link:hover {
          color: var(--foreground);
          border-color: rgba(0, 128, 255, 0.5);
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7), 0 0 4px rgba(0, 128, 255, 0.2);
          background: linear-gradient(135deg, rgba(0, 128, 255, 0.08), rgba(0, 0, 0, 0.08));
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 128, 255, 0.12);
        }

        .navbar-link.active {
          color: var(--foreground);
          border-color: rgba(0, 128, 255, 0.6);
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7), 0 0 6px rgba(0, 128, 255, 0.3);
          background: linear-gradient(135deg, rgba(0, 128, 255, 0.12), rgba(255, 0, 128, 0.02));
          box-shadow: 
            0 4px 10px rgba(0, 128, 255, 0.15),
            inset 0 0 8px rgba(0, 128, 255, 0.05);
        }

        @media (max-width: 640px) {
          .navbar-wrapper {
            margin-bottom: 0.25rem;
            padding: 0.35rem 0;
          }

          .navbar-container {
            gap: 0.35rem;
            padding: 0 0.5rem;
          }

          .navbar-link {
            padding: 0.3rem 0.65rem;
            font-size: 0.65rem;
          }
        }
      `}</style>

      <div className="navbar-wrapper">
        <nav className="navbar-container">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar-link ${pathname === link.href ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}