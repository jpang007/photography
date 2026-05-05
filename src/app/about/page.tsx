import Image from 'next/image';
import { aboutContent, siteSettings } from '@/data/siteData';

export const metadata = {
  title: `About - ${siteSettings.siteName}`,
  description: 'Learn more about my photography journey and approach',
};

export default function AboutPage() {
  return (
    <div className="px-6 pb-24 pt-32 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 border-b border-neutral-200 pb-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-neutral-500">
            Behind the lens
          </p>
          <h1 className="text-5xl md:text-7xl">About</h1>
        </div>

        <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <div className="relative aspect-[4/5] w-full max-w-sm bg-neutral-100">
            <Image
              src={aboutContent.portraitImage}
              alt={siteSettings.photographerName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 50vw"
            />
          </div>

          <div>
            <h2 className="mb-6 text-3xl leading-tight md:text-5xl">Hello, I'm {siteSettings.photographerName}</h2>
            <div>
              <p className="whitespace-pre-line text-lg leading-8 text-neutral-700">
                {aboutContent.bio}
              </p>
              {aboutContent.philosophy && (
                <p className="mt-8 border-l border-neutral-300 pl-5 text-xl italic leading-relaxed text-neutral-600">
                  {aboutContent.philosophy}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
