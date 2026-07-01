/*
Purpose: Defines the application routes and animates variant transitions.
Props summary: none.
Usage example: <AppRouter />
*/
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import CreativeLayout from '@/layouts/variants/CreativeLayout';
import MinimalLayout from '@/layouts/variants/MinimalLayout';
import PuzzleLayout from '@/layouts/variants/PuzzleLayout';
import SidebarLayout from '@/layouts/variants/SidebarLayout';
import type { LayoutNavItem } from '@/types/cv.types';

const NAV_ITEMS: LayoutNavItem[] = [
  { label: 'Minimal', path: '/minimal' },
  { label: 'Sidebar', path: '/sidebar' },
  { label: 'Creative', path: '/creative' },
  { label: 'Puzzle', path: '/puzzle' },
];

/**
 * Renders the routed layouts and the persistent header chrome.
 */
export function AppRouter() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const transitionProps = shouldReduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
      };

  return (
    <div className="flex min-h-screen flex-col bg-bg text-apptext">
      <Header navItems={NAV_ITEMS} />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          {...transitionProps}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <Routes location={location}>
            <Route path="/" element={<Navigate replace to="/minimal" />} />
            <Route path="/minimal" element={<MinimalLayout />} />
            <Route path="/sidebar" element={<SidebarLayout />} />
            <Route path="/creative" element={<CreativeLayout />} />
            <Route path="/puzzle" element={<PuzzleLayout />} />
            <Route path="*" element={<Navigate replace to="/minimal" />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
