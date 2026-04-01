import Link from 'next/link';
import { siteSettings } from '@/data/siteData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-400 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-white font-serif text-xl mb-4">
              {siteSettings.photographerName}
            </h3>
            <p className="text-sm">
              {siteSettings.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white text-sm font-medium mb-4 tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm hover:text-white transition-smooth">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm hover:text-white transition-smooth">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-white transition-smooth">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white text-sm font-medium mb-4 tracking-wide">
              Connect
            </h4>
            <ul className="space-y-3">
              {siteSettings.social.instagram && (
                <li>
                  <a
                    href={siteSettings.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-smooth"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {siteSettings.social.twitter && (
                <li>
                  <a
                    href={siteSettings.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-smooth"
                  >
                    Twitter
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 pt-8 text-center text-sm">
          <p>
            &copy; {currentYear} {siteSettings.photographerName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
