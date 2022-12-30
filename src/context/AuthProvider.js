import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  onAuthStateChanged,
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //create user with email pass
  const signup = async (email, password, profile) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        // await sendEmailVerification(auth.currentUser);
      })
      .catch((err) => setError(err));
    await updateProfile(auth.currentUser, profile);
    const username = auth.currentUser;
    setUser({ ...username });
    return username;
  };

  //login wiht user password
  const login = async (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //logout user
  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const authinfo = {
    signup,
    login,
    user,
    loading,
    error,
    logout,
  };
  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
