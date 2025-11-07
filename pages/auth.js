import React from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import Header from "../components/Header";

const AuthPage = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(firestore, "users", user.uid), {
          uid: user.uid,
          username: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
          followers: [],
          following: [],
          likes: 0,
          createdAt: new Date()
        });
      }

      router.push("/");
    } catch (error) {
      console.error("Error signing in:", error);
      alert("حدث خطأ أثناء التسجيل");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">جاري التحميل...</div>
      </div>
    );
  }

  if (user) {
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-pink-600">
      <Header />
      
      <div className="pt-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center text-white mb-12">
            <div className="text-8xl mb-6">🎵</div>
            <h1 className="text-4xl font-bold mb-4">مرحبًا في TikTok</h1>
            <p className="text-xl opacity-90">انضم إلى الملايين وابدأ رحلتك الإبداعية</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center mb-8">ابدأ الآن</h2>
            
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-white border border-gray-300 rounded-xl py-4 px-6 flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors mb-4"
            >
              <span className="text-2xl">🔍</span>
              <span className="text-gray-700 font-medium">المتابعة بـ Google</span>
            </button>

            <div className="text-center text-gray-600 text-sm mt-6">
              <p>بالمتابعة، فإنك توافق على</p>
              <p>
                <span className="text-red-500 cursor-pointer">شروط الخدمة</span> و{" "}
                <span className="text-red-500 cursor-pointer">سياسة الخصوصية</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-12">
            <div className="text-center text-white">
              <div className="text-3xl mb-2">🎭</div>
              <p className="text-sm">محتوى مبدع</p>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl mb-2">👥</div>
              <p className="text-sm">مجتمع نشط</p>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-sm">سهل الاستخدام</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
