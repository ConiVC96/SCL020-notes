import { createContext, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const authContext = createContext();
//Creo variables globales
const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

const AuthProvider = ({ children }) => {
  const signUp = async (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = async (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    await signOut(auth);
    console.log("Cerró Sesión");
    localStorage.removeItem("currentUser");
    //elimina data del almacenamiento local (el usuario actual)
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      //escucho cada vez que hay un cambio si existen los parametros
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      //localStorage guarda la info por tiempo indefinido aunque se cierre el navegador
      //setItem necesita la key y el valor
      //localStorage es una variable global, estoy creando este item que se llamará currentuser y el currentuser que me devuelve auth esta minificado por lo que debo
      // usar el JSON.stringify para que lo devuelva como string para que me permita guardarlo en localStorage
      //luego que la página se cargue ejecuta esta función
    });
  }, []);

  return (
    <authContext.Provider value={{ signUp, login, loginWithGoogle, logOut }}>
      {children}
    </authContext.Provider>
  );
};
export { AuthProvider, useAuth, authContext };
