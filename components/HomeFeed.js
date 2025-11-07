hereimport { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion } from "framer-motion";
import { firestore, auth } from "../firebase/firebase";
import VideoCard from "./VideoCard";
import Header from "./Header";
import BottomNav from "./BottomNav";

const HomeFeed = () => {
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black"
    >
      <Header />
      
      <div className="pt-16 pb-20">
        {posts.map((post, index) => (
          <VideoCard
            key={post.id}
            post={post.data()}
            postId={post.id}
            user={user}
            index={index}
          />
        ))}
        
        {posts.length === 0 && (
          <div className="flex items-center justify-center h-screen text-white">
            <div className="text-center">
              <div className="text-6xl mb-4">🎥</div>
              <h2 className="text-2xl font-bold mb-2">لا توجد مقاطع فيديو</h2>
              <p className="text-gray-400">كن أول من يرفع مقطع فيديو!</p>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </motion.div>
  );
};

export default HomeFeed;
