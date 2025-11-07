import React from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

const BottomNav = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const navItems = [
    { icon: "🏠", label: "الرئيسية", path: "/" },
    { icon: "👥", label: "الأصدقاء", path: "/friends" },
    { icon: "➕", label: "رفع", path: "/upload" },
    { icon: "💬", label: "الرسائل", path: "/inbox" },
    { icon: "👤", label: "أنا", path: user ? `/user/${user.uid}` : "/auth" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-50">
      <div className="flex justify-between items-center">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all ${
              router.pathname === item.path
                ? "text-red-500 bg-red-50"
                : "text-gray-600 hover:text-red-500"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
