/*
Purpose: Shared shell that normalizes spacing, max width, and motion across layouts.
Props summary: variant, children, className, fullBleed.
Usage example: <BaseLayout variant="classic">...</BaseLayout>
*/
import { motion, useReducedMotion } from 'framer-motion';

import type { BaseLayoutProps } from '@/types/cv.types';

/**
 * Provides a common wrapper and animation profile for each layout variant.
 */
export default function BaseLayout({
  variant,
  children,
  className = '',
  fullBleed = false,
}: BaseLayoutProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.main
      data-layout={variant}
      className={[
        'mx-auto w-full',
        fullBleed ? 'max-w-none' : 'max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8',
        className,
      ].join(' ')}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.main>
  );
}
