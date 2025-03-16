"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MoveIcon as LocalMoving,
  Shield,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 text-gray-900 font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <main className="relative flex flex-col items-center px-4 sm:px-8 lg:px-16 py-12">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 xl:py-40 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-50 -z-10" />
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-6 animate-fade-in-up">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                  Professional Moving Services
                </h1>
                <p className="max-w-[600px] text-lg md:text-xl text-gray-600 leading-relaxed">
                  Connect with reliable movers in your area. Get your belongings
                  moved safely and efficiently.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/movers">
                    <Button className="group inline-flex items-center px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                      Find Movers
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="absolute w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-50 animate-pulse" />
                <LocalMoving className="h-64 w-64 md:h-80 md:w-80 text-blue-600 z-10 animate-spin-slow" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-white/80 backdrop-blur-sm shadow-inner">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <div className="group flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <Shield className="h-14 w-14 text-blue-600 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-gray-800">
                  Verified Movers
                </h3>
                <p className="text-gray-600">
                  All our movers are thoroughly vetted and verified for your
                  peace of mind.
                </p>
              </div>
              <div className="group flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <Star className="h-14 w-14 text-yellow-500 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-gray-800">
                  Quality Service
                </h3>
                <p className="text-gray-600">
                  Professional movers committed to providing excellent service.
                </p>
              </div>
              <div className="group flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <LocalMoving className="h-14 w-14 text-teal-600 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-gray-800">
                  Efficient Moving
                </h3>
                <p className="text-gray-600">
                  Get your belongings moved quickly and safely to your new
                  location.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white flex flex-wrap justify-center gap-6">
        <a
          className="flex items-center gap-2 hover:text-blue-400 transition-colors"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:text-blue-400 transition-colors"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:text-blue-400 transition-colors"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        .animate-spin-slow {
          animation: spinSlow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
