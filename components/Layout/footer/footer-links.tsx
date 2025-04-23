// components/layout/footer/footer-links.tsx
import React from "react";
import Link from "next/link";

interface FooterLinkGroup {
  title: string;
  links: {
    text: string;
    href: string;
  }[];
}

interface FooterLinksProps {
  linkGroups: FooterLinkGroup[];
}

export function FooterLinks({ linkGroups }: FooterLinksProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {linkGroups.map((group, index) => (
        <div key={index}>
          <h3 className="font-semibold text-white mb-4">{group.title}</h3>
          <ul className="space-y-2">
            {group.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <Link
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
