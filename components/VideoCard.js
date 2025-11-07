import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { doc, updateDoc, arrayUnion, arrayRemove, increment } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const VideoCard = ({ post, postId, user, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const videoRef = useRef(null);

  useEffect(() => {
    if (user && post.likedBy?.includes(user.uid)) {
      setIsLiked(true);
    }
  }, [user, post.likedBy]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = async () => {
    if (!user) {
      alert("يجب تسجيل الدخول للإعجاب");
      return;
    }

    const postRef = doc(firestore, "posts", postId);
    try {
      if (isLiked) {
        await updateDoc(postRef, {
          likes: increment(-1),
          likedBy: arrayRemove(user.uid)
        });
        setLikesCount(likesCount - 1);
      } else {
        await updateDoc(postRef, {
          likes: increment(1),
          likedBy: arrayUnion(user.uid)
        });
        setLikesCount(likesCount + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative h-screen bg-black"
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        onClick={togglePlay}
        src={post.videoUrl}
        poster={post.thumbnail}
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex justify-between items-end">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div 
                className="w-10 h-10 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${post.userInfo?.photoURL})` }}
              />
              <div>
                <h3 className="font-bold">@{post.userInfo?.username}</h3>
                <p className="text-sm text-gray-300">{post.caption}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <span>🎵</span>
              <span>الصوت الأصلي - {post.userInfo?.username}</span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6 ml-4">
            <button 
              onClick={handleLike}
              className="flex flex-col items-center"
            >
              {isLiked ? (
                <div className="p-2 bg-red-500 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
              ) : (
                <div className="p-2 bg-white/20 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              )}
              <span className="text-xs mt-1">{likesCount}</span>
            </button>

            <button className="flex flex-col items-center">
              <div className="p-2 bg-white/20 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-xs mt-1">{post.comments?.length || 0}</span>
            </button>

            <button className="flex flex-col items-center">
              <div className="p-2 bg-white/20 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <span className="text-xs mt-1">مشاركة</span>
            </button>
          </div>
        </div>
      </div>

      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          <div className="bg-black/50 rounded-full p-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default VideoCard;
