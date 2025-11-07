import { useEffect } from 'react'
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

export default function Friends() {
  useEffect(() => {
    console.log('🎯 صفحة الأصدقاء تعمل!')
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-red-600">👥 الأصدقاء</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-xl font-semibold mb-2">صفحة الأصدقاء تعمل!</h2>
            <p className="text-gray-600 mb-4">هذه صفحة اختبار بسيطة</p>
            
            <button 
              className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600"
              onClick={() => alert('الزر يعمل! 🎯')}
            >
              اختبر الزر
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
    }
