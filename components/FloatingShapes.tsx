import React from 'react';

interface FloatingShapeProps {
  className: string;
  delay?: string;
}

const FloatingShape = ({ className, delay = '0s' }: FloatingShapeProps) => (
  <div 
    className={`absolute rounded-full bg-gradient-to-r opacity-20 animate-float ${className}`}
    style={{ animationDelay: delay }}
  />
);

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <FloatingShape 
        className="w-64 h-64 from-blue-400 to-purple-400 -top-32 -left-32" 
        delay="0s" 
      />
      <FloatingShape 
        className="w-48 h-48 from-purple-400 to-pink-400 top-1/4 right-1/4" 
        delay="2s" 
      />
      <FloatingShape 
        className="w-32 h-32 from-indigo-400 to-blue-400 bottom-1/4 left-1/4" 
        delay="4s" 
      />
      <FloatingShape 
        className="w-72 h-72 from-pink-400 to-purple-400 -bottom-36 -right-36" 
        delay="1s" 
      />
    </div>
  );
} 