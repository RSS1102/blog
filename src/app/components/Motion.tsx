'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

export function FadeIn({ children, delay = 0, duration = 0.4, ...props }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface SlideUpProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

export function SlideUp({ children, delay = 0, duration = 0.5, ...props }: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: [0.2, 0.9, 0.2, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface ScaleInProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

export function ScaleIn({ children, delay = 0, duration = 0.3, ...props }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
}

export function StaggerContainer({ children, delay = 0.1, ...props }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: delay
          }
        }
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...props }: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ ease: 'easeOut', duration: 0.4 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
