import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { auth } from "../firebase/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // auth still initializing

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false); // auth ready
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      user,         // 🔥 full user object
      isUserLoggedIn: !!user,
      loading,      // 🔁 loading state
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* prevent render until auth ready */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
