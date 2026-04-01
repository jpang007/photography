import Image from 'next/image';
import Link from 'next/link';
import { siteSettings } from '@/data/siteData';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Hero Image - REPLACE with your hero image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-main.jpg"
          alt="Hero image"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6">
          {siteSettings.photographerName}
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-white/90">
          {siteSettings.tagline}
        </p>
        <Link
          href="/portfolio"
          className="inline-block px-8 py-4 bg-white text-neutral-900 hover:bg-white/90 transition-smooth text-lg font-medium"
        >
          View Portfolio
        </Link>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
