'use client';

import React from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import Link from 'next/link';

function DashboardContent() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Header */}
      <header className="relative z-10 bg-white bg-opacity-10 backdrop-blur-md border-b border-purple-400 border-opacity-30 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">👤 Dashboard</h1>
            <p className="text-purple-200 text-sm">Welcome back, {user?.fullName}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-xl transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Profile Card */}
          <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-purple-200 border-opacity-30 lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="text-5xl mr-4">📋</div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Profile Information</h2>
                <p className="text-purple-600">Your account details</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200 border-opacity-50">
                <label className="text-xs font-semibold text-purple-700 uppercase">Email Address</label>
                <p className="text-lg text-slate-900 font-semibold mt-1">{user?.email}</p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200 border-opacity-50">
                <label className="text-xs font-semibold text-blue-700 uppercase">Full Name</label>
                <p className="text-lg text-slate-900 font-semibold mt-1">{user?.fullName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-200 border-opacity-50">
                  <label className="text-xs font-semibold text-indigo-700 uppercase">Role</label>
                  <div className="mt-1">
                    <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {user?.role}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 border-opacity-50">
                  <label className="text-xs font-semibold text-green-700 uppercase">Member Since</label>
                  <p className="text-lg text-slate-900 font-semibold mt-1">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl p-6 text-white">
              <div className="text-4xl mb-3">🔐</div>
              <h3 className="text-lg font-bold mb-1">Authenticated</h3>
              <p className="text-purple-100 text-sm">Your session is active</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-2xl p-6 text-white">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-lg font-bold mb-1">Protected</h3>
              <p className="text-blue-100 text-sm">JWT token secured</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-2xl p-6 text-white">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="text-lg font-bold mb-1">Premium</h3>
              <p className="text-indigo-100 text-sm">Full access granted</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">🎯 Available Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-purple-400 border-opacity-30 hover:border-opacity-100 transition duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise Security</h3>
              <p className="text-slate-900 font-semibold">BCrypt encryption and JWT token-based authentication</p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-blue-400 border-opacity-30 hover:border-opacity-100 transition duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Protected Routes</h3>
              <p className="text-slate-900 font-semibold">Only authenticated users can access dashboard</p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-cyan-400 border-opacity-30 hover:border-opacity-100 transition duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">👤</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">User Profiles</h3>
              <p className="text-slate-900 font-semibold">Manage account info and view profile details</p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-pink-400 border-opacity-30 hover:border-opacity-100 transition duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Session Management</h3>
              <p className="text-slate-900 font-semibold">Automatic token validation and refresh</p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-indigo-400 border-opacity-30 hover:border-opacity-100 transition duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">💾</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Database Integration</h3>
              <p className="text-slate-900 font-semibold">Secure MySQL storage with JPA integration</p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-green-400 border-opacity-30 hover:border-opacity-100 transition duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Responsive Design</h3>
              <p className="text-slate-900 font-semibold">Works seamlessly on all devices</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
