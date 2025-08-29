'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Zap, Shield, TrendingUp, Clock, Headphones } from 'lucide-react';

const Home=()=>{
  const [currentFeature, setCurrentFeature] = useState(0);
  const features = [
    {
      title: 'Easy Product Management',
      description: 'Streamline your product catalog with intuitive tools',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Real-time Updates',
      description: 'Get instant updates on your product inventory',
      icon: Zap,
      color: 'text-yellow-600'
    },
    {
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security for your data',
      icon: Shield,
      color: 'text-green-600'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Animated Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ProductCatalog
              </span>
            </h1>
            
            {/* Animated Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-up">
              Revolutionize your product management workflow with our powerful, intuitive platform
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up delay-300">
              <Link 
                href="/products" 
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Get Started Free
              </Link>
              <Link 
                href="/login" 
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Sign In
              </Link>
            </div>

            {/* Animated Feature Showcase */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto animate-fade-in delay-500 border border-gray-200">
            <div className="flex items-center justify-center mb-6">
              {React.createElement(features[currentFeature].icon, { className: `w-12 h-12 ${features[currentFeature].color} animate-bounce` })}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {features[currentFeature].title}
            </h3>
              <p className="text-gray-600">
                {features[currentFeature].description}
              </p>
              <div className="flex justify-center space-x-2 mt-4">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentFeature ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full animate-float-1"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-100 rounded-full animate-float-2"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-blue-200 rounded-full animate-float-3"></div>
      </div>
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in delay-700">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Products Managed</div>
            </div>
            <div className="animate-fade-in delay-800">
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div className="animate-fade-in delay-900">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-20 text-center bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Ready to Transform Your Product Management?
        </h2>
        <Link 
          href="/register" 
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-xl"
        >
          Create Free Account
        </Link>
      </div>
    </div>
  );
}
export default Home