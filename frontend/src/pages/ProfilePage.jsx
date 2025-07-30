import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user?.email || null);
    });
    return () => unsubscriber();
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 flex items-center justify-center overflow-hidden">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-4">
          {`Welcome, ${currentUser ? currentUser : "Guest"}!`}
        </h1>
        <p className="text-gray-600 text-lg">
          We're glad to see you on your profile page.
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
