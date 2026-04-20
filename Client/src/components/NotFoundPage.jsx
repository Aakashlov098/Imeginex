// import Link from 'next/link';

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-12">
      {/* Background gradient accent */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        {/* 404 Number */}
        <div className="space-y-2">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600 bg-clip-text text-transparent">
            404
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Error message */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">Page Not Found</h2>
          <p className="text-lg text-slate-400">
            We couldn't find what you were looking for. It seems this page has disappeared into the void.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center gap-3 py-8">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link
            to="/"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Back to Home
          </Link>
          <Link
            to="/explore"
            className="px-8 py-3 border-2 border-purple-500 text-purple-400 hover:text-purple-300 hover:border-purple-400 font-semibold rounded-lg transition-all duration-200"
          >
            Explore
          </Link>
        </div>

        {/* Additional help text */}
        <p className="text-sm text-slate-500 pt-4">
          Error Code: <span className="text-purple-400 font-mono">404_NOT_FOUND</span>
        </p>
      </div>
    </div>
  );
}