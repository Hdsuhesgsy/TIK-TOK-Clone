import React from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

const Header = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 py-3 px-4 z-50">
      <div className="flex justify-between items-center">
        <button 
          onClick={() => router.push("/")}
          className="text-2xl font-bold text-red-500"
        >
          TikTok
        </button>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث..."
              className="w-full bg-gray-100 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">🔍</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-red-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
          {user ? (
            <button 
              onClick={() => router.push(`/user/${user.uid}`)}
              className="w-8 h-8 rounded-full bg-cover bg-center border-2 border-red-500"
              style={{ backgroundImage: `url(${user.photoURL})` }}
            />
          ) : (
            <button 
              onClick={() => router.push("/auth")}
              className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              تسجيل الدخول
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
