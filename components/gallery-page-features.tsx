'use client';

import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  Lightbulb,
  Medal,
  Presentation,
  Trophy,
  Users,
} from 'lucide-react';
import { Features } from '@/components/ui/features';
import type { GalleryFeature } from '@/lib/gallery-pages';

const icons = {
  Trophy,
  Medal,
  BookOpen,
  CalendarDays,
  Users,
  Lightbulb,
  Presentation,
  GraduationCap,
};

type GalleryPageFeaturesProps = {
  eyebrow: string;
  title: string;
  features: GalleryFeature[];
};

export function GalleryPageFeatures({ eyebrow, title, features }: GalleryPageFeaturesProps) {
  return (
    <Features
      eyebrow={eyebrow}
      heading={title}
      progressGradientLight="bg-gradient-to-r from-orange-400 to-primary"
      progressGradientDark="bg-gradient-to-r from-orange-300 to-primary"
      features={features.map((feature) => ({
        ...feature,
        icon: icons[feature.icon],
      }))}
    />
  );
}
