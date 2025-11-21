import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthProvider } from '../components/AuthProvider';
import { ResumeProvider } from '../components/resume/ResumeProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartCV - AI Resume Builder",
  description: "Create, analyze, and export beautiful resumes with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f6f8fb] min-h-screen w-full`}>
        <AuthProvider>
          <ResumeProvider>
            <Navbar />
            
            <main className="flex flex-col items-center justify-start px-2 py-10 md:px-12 lg:px-24 bg-[#ffffff] min-h-[80vh] w-full">
              {children}
            </main>
            <Footer />
          </ResumeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}