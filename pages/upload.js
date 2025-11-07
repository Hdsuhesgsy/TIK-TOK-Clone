hereimport React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore, auth, storage } from "../firebase/firebase";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

const UploadPage = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!user || !videoFile) {
      alert("يجب تسجيل الدخول واختيار فيديو");
      return;
    }

    setIsUploading(true);

    try {
      const videoRef = ref(storage, `videos/${user.uid}/${Date.now()}_${videoFile.name}`);
      const snapshot = await uploadBytes(videoRef, videoFile);
      const videoUrl = await getDownloadURL(snapshot.ref);

      await addDoc(collection(firestore, "posts"), {
        userId: user.uid,
        userInfo: {
          uid: user.uid,
          username: user.displayName,
          photoURL: user.photoURL
        },
        videoUrl: videoUrl,
        caption: caption,
        likes: 0,
        comments: [],
        timestamp: serverTimestamp(),
        likedBy: []
      });

      alert("تم رفع الفيديو بنجاح! 🎉");
      router.push("/");
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("حدث خطأ أثناء رفع الفيديو");
    } finally {
      setIsUploading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-4">يجب تسجيل الدخول</h2>
          <button 
            onClick={() => router.push("/auth")}
            className="bg-red-500 text-white px-6 py-3 rounded-full font-medium hover:bg-red-600"
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">رفع فيديو جديد</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              {previewUrl ? (
                <div className="relative">
                  <video
                    src={previewUrl}
                    className="w-full h-64 object-cover rounded-lg"
                    controls
                  />
                  <button
                    onClick={() => {
                      setVideoFile(null);
                      setPreviewUrl("");
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-red-500 transition-colors"
                >
                  <div className="text-6xl mb-4">🎥</div>
                  <h3 className="text-lg font-semibold mb-2">اختر فيديو</h3>
                  <p className="text-gray-600">انقر لرفع فيديو من جهازك</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اكتب تعليقًا
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="ماذا يحدث في هذا الفيديو؟"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows="3"
              />
            </div>

            <button
              onClick={handleUpload}
              disabled={!videoFile || isUploading}
              className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isUploading ? "جاري الرفع..." : "نشر الفيديو"}
            </button>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <h3 className="font-semibold text-yellow-800 mb-2">نصائح للرفع:</h3>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• استخدم فيديوهات قصيرة وجذابة</li>
              <li>• أضف تعليقًا وصفيًا</li>
              <li>• اختر أفضل اللحظات</li>
            </ul>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default UploadPage;
