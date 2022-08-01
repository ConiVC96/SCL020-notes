import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export function AuthProvider({ children }) {
 const signUp = async (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = async (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

    const loginWithGoogle = () => {
      const googleProvider = new GoogleAuthProvider();
      return signInWithPopup(auth, googleProvider);
    };

    const logOut = async () => {
      await signOut(auth)
      console.log('Cerró Sesión')
      localStorage.removeItem('currentUser')
      //elimina data del almacenamiento local (el usuario actual)
    }
  
    useEffect(() => {
      onAuthStateChanged(auth, currentUser => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        //localStorage guarda la info por tiempo indefinido aunque se cierre el navegador
        //setItem necesita la key y el valor
      })
    }, [])
  
    return (
      <authContext.Provider value={{ signUp, login, loginWithGoogle, logOut }}>
        {children}
      </authContext.Provider>
    )
  }
