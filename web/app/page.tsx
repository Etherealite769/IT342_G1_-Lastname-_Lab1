'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse\" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 text-center max-w-3xl">
        {/* Logo/Icon */}
        <div className="mb-8 inline-block">
          <div className="text-7xl animate-bounce\">🔐</div>
        </div>

        <h1 className="text-7xl font-black text-white mb-4 leading-tight\">
          Secure Auth System
        </h1>
        
        <p className="text-xl md:text-2xl text-purple-200 mb-4\">
          Built with Spring Boot & React
        </p>

        <p className="text-purple-300 mb-12 text-lg\">
          Experience seamless authentication with enterprise-grade security
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Link
            href="/register"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-10 rounded-xl text-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            Create Account
          </Link>
          <Link
            href="/login"
            className="border-2 border-purple-400 text-white hover:bg-purple-500 hover:border-purple-600 font-bold py-4 px-10 rounded-xl text-lg transition duration-300 transform hover:scale-105"
          >
            Sign In
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-purple-400 border-opacity-30 hover:border-opacity-100 transition duration-300">
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="text-slate-900 font-bold mb-2">BCrypt Security</h3>
            <p className="text-slate-900 font-semibold text-sm">Enterprise-grade password encryption</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-purple-400 border-opacity-30 hover:border-opacity-100 transition duration-300">
            <div className="text-3xl mb-3">🔑</div>
            <h3 className="text-slate-900 font-bold mb-2">JWT Tokens</h3>
            <p className="text-slate-900 font-semibold text-sm">Secure token-based authentication</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-purple-400 border-opacity-30 hover:border-opacity-100 transition duration-300">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-slate-900 font-bold mb-2">Fast & Reliable</h3>
            <p className="text-slate-900 font-semibold text-sm">React + Spring Boot performance</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-purple-400 border-opacity-30 hover:border-opacity-100 transition duration-300">
            <div className="text-3xl mb-3">🗂️</div>
            <h3 className="text-slate-900 font-bold mb-2">MySQL Storage</h3>
            <p className="text-slate-900 font-semibold text-sm">Reliable database integration</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-purple-400 border-opacity-30 hover:border-opacity-100 transition duration-300">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-slate-900 font-bold mb-2">Protected Routes</h3>
            <p className="text-slate-900 font-semibold text-sm">Secure access control</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-purple-400 border-opacity-30 hover:border-opacity-100 transition duration-300">
            <div className="text-3xl mb-3">👤</div>
            <h3 className="text-slate-900 font-bold mb-2">User Profiles</h3>
            <p className="text-slate-900 font-semibold text-sm">Manage your account info</p>
          </div>
        </div>
      </div>
    </div>
  );
}
         
