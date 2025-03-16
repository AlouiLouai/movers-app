"use client"; // Required for client-side error handling in App Router

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }: {error: any, reset: any}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 text-gray-900 font-[family-name:var(--font-geist-sans)] flex items-center justify-center overflow-hidden">
      <div className="relative container mx-auto px-4 sm:px-8 lg:px-16 py-12 text-center animate-fade-in-up">
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-100 via-transparent to-transparent opacity-50 -z-10" />

        {/* Error Content */}
        <div className="max-w-lg mx-auto space-y-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500">
            Oops! Something Went Wrong
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {error?.message || "An unexpected error occurred. Don’t worry, we’re on it!"}
          </p>

          {/* Error Icon */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-48 h-48 bg-red-200 rounded-full blur-3xl opacity-50 animate-pulse" />
            <svg
              className="h-32 w-32 text-red-600 z-10 animate-spin-slow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => reset()}
              className="group inline-flex items-center px-6 py-3 text-lg font-semibold bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Try Again
              <ArrowLeft className="ml-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="inline-flex items-center px-6 py-3 text-lg font-semibold text-blue-600 border-blue-600 hover:bg-blue-50 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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