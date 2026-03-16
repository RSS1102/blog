'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
}

export default function Skeleton({ 
  className = '', 
  variant = 'rectangular',
  width,
  height 
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700 animate-pulse';
  
  const variantClasses = {
    text: 'rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full'
  };

  const style: React.CSSProperties = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    />
  );
}

// 预设的骨架屏组件
export function BlogCardSkeleton() {
  return (
    <div className="card p-5">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 self-start">
          <Skeleton width={60} height={24} className="rounded-full" />
          <Skeleton width={70} height={24} className="rounded-full" />
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 mb-2">
            <Skeleton width="60%" height={24} />
            <Skeleton width={80} height={16} />
          </div>
          <Skeleton width="100%" height={20} />
        </div>
      </div>
    </div>
  );
}

export function RepoCardSkeleton() {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-3">
        <Skeleton width="70%" height={20} />
        <Skeleton width={60} height={20} />
      </div>
      <Skeleton width="100%" height={16} className="mb-2" />
      <Skeleton width="80%" height={16} />
    </div>
  );
}
