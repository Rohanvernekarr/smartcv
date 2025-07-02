'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { useRouter } from 'next/navigation';
import AnimatedBackground from '../components/AnimatedBackground';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/analyse/FeaturesSection';
import CTASection from '../components/CTASection';

export default function LandingPage() {
  const { user, loading } = useAuth() || {};
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (loading) return null;
  if (user) return null;

  return (
    <div className="relative w-full -mx-4 md:-mx-12 lg:-mx-24 -mt-10 overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <HeroSection isVisible={isVisible} />
        <FeaturesSection />
        <CTASection />
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}