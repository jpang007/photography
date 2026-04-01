import Image from 'next/image';
import Link from 'next/link';
import { aboutContent, siteSettings } from '@/data/siteData';

export const metadata = {
  title: `About - ${siteSettings.siteName}`,
  description: 'Learn more about my photography journey and approach',
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">About</h1>
          <p className="text-neutral-600 text-lg">
            Behind the lens
          </p>
        </div>

        {/* Portrait & Bio Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          {/* Portrait Image */}
          <div className="relative aspect-[3/4] bg-neutral-200">
            <Image
              src={aboutContent.portraitImage}
              alt={siteSettings.photographerName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-serif mb-6">Hello, I'm {siteSettings.photographerName}</h2>
            <div className="prose prose-neutral max-w-none">
              <p className="text-neutral-700 leading-relaxed text-lg">
                {aboutContent.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
