import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "../firebase/firebase";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

const FriendsPage = () => {
  const [user] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("discover");

  useEffect(() => {
    if (!user) return;

    const usersQuery = query(
      collection(firestore, "users"),
      where("uid", "!=", user.uid)
    );

    const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
    });

    return unsubscribe;
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">الأصدقاء</h1>
          
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("discover")}
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === "discover"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-600"
              }`}
            >
              اكتشاف
            </button>
            <button
              onClick={() => setActiveTab("following")}
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === "following"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-600"
              }`}
            >
              المتابَعون
            </button>
            <button
              onClick={() => setActiveTab("followers")}
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === "followers"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-600"
              }`}
            >
              المتابِعون
            </button>
          </div>

          <div className="space-y-4">
            {users.map((userItem) => (
              <div key={userItem.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-12 h-12 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${userItem.photoURL})` }}
                  />
                  <div>
                    <h3 className="font-semibold">@{userItem.username}</h3>
                    <p className="text-gray-600 text-sm">{userItem.followers?.length || 0} متابع</p>
                  </div>
                </div>
                
                <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600">
                  متابعة
                </button>
              </div>
            ))}
          </div>

          {users.length === 0 && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">👥</div>
              <h2 className="text-xl font-semibold mb-2">لا يوجد مستخدمون بعد</h2>
              <p className="text-gray-600">شارك التطبيق مع أصدقائك!</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default FriendsPage;
