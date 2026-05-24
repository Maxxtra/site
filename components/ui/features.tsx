'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface FeaturesProps {
  features: {
    id: number;
    icon: React.ElementType;
    title: string;
    description: string;
    image: string;
  }[];
  primaryColor?: string;
  progressGradientLight?: string;
  progressGradientDark?: string;
  eyebrow?: string;
  heading?: string;
}

export function Features({
  features,
  primaryColor = 'sky-500',
  progressGradientLight = 'bg-gradient-to-r from-sky-400 to-sky-500',
  progressGradientDark = 'bg-gradient-to-r from-sky-300 to-sky-400',
  eyebrow = 'Etape vizuale. Rezultate clare.',
  heading = 'Cum arata parcursul',
}: FeaturesProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [features.length, progress]);

  useEffect(() => {
    const activeFeatureElement = featureRefs.current[currentFeature];
    const container = containerRef.current;

    if (activeFeatureElement && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = activeFeatureElement.getBoundingClientRect();

      container.scrollTo({
        left: activeFeatureElement.offsetLeft - (containerRect.width - elementRect.width) / 2,
        behavior: 'smooth',
      });
    }
  }, [currentFeature]);

  const handleFeatureClick = (index: number) => {
    setCurrentFeature(index);
    setProgress(0);
  };

  if (features.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            {eyebrow}
          </span>
          <h2 className="mt-4 mb-6 text-4xl font-bold text-foreground md:text-5xl">{heading}</h2>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div
            ref={containerRef}
            className="no-scrollbar order-1 flex flex-row overflow-hidden overflow-x-auto scroll-smooth pb-4 md:space-x-6 lg:flex lg:flex-col lg:space-y-8 lg:space-x-0 lg:overflow-visible"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = currentFeature === index;

              return (
                <div
                  key={feature.id}
                  ref={(el) => {
                    featureRefs.current[index] = el;
                  }}
                  className="relative flex-shrink-0 cursor-pointer"
                  onClick={() => handleFeatureClick(index)}
                >
                  <div
                    className={`
                      flex max-w-sm items-start space-x-4 p-3 transition-all duration-300 md:max-w-sm lg:max-w-2xl lg:flex-row
                      ${
                        isActive
                          ? 'rounded-xl border border-border bg-card shadow-xl'
                          : ''
                      }
                    `}
                  >
                    <div
                      className={`
                        hidden rounded-full p-3 transition-all duration-300 md:block
                        ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-primary/10 text-primary'
                        }
                      `}
                    >
                      <Icon size={24} />
                    </div>

                    <div className="flex-1">
                      <h3
                        className={`
                          mb-2 text-lg font-semibold transition-colors duration-300 md:mt-4 lg:mt-0
                          ${isActive ? 'text-foreground' : 'text-foreground/75'}
                        `}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`
                          text-sm transition-colors duration-300
                          ${isActive ? 'text-muted-foreground' : 'text-muted-foreground/60'}
                        `}
                      >
                        {feature.description}
                      </p>
                      <div className="mt-4 h-1 overflow-hidden rounded-sm bg-muted">
                        {isActive && (
                          <motion.div
                            className={`h-full ${progressGradientLight} dark:${progressGradientDark}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: 'linear' }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative order-1 mx-auto max-w-lg lg:order-2">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative"
            >
              <Image
                className="rounded-2xl border border-border shadow-lg"
                src={features[currentFeature].image}
                alt={features[currentFeature].title}
                width={600}
                height={400}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
