import React from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

const InboxPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">الرسائل</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-center py-8">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="text-xl font-semibold mb-2">لا توجد رسائل بعد</h2>
              <p className="text-gray-600">عندما تتلقى رسائل جديدة، ستظهر هنا</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button className="bg-white p-4 rounded-lg shadow-sm text-center hover:bg-gray-50">
              <div className="text-2xl mb-2">👥</div>
              <div className="font-medium">إضافة أصدقاء</div>
            </button>
            
            <button className="bg-white p-4 rounded-lg shadow-sm text-center hover:bg-gray-50">
              <div className="text-2xl mb-2">🔍</div>
              <div className="font-medium">اكتشاف أشخاص</div>
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default InboxPage;
