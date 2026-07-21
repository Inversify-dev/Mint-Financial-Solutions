import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  height?: number;
  showText?: boolean;
  light?: boolean;
}

export default function Logo({ className = '', height = 54 }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`} style={{ height }}>
      <Image
        src="/logo.png"
        alt="Mint B2B Solutions"
        width={280}
        height={96}
        className="h-full w-auto object-contain max-h-full scale-105"
        priority
      />
    </div>
  );
}
