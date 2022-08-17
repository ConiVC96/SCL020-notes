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
//{firebase} extraigo las funciones de fb


const authContext = createContext();
//AuthContetext me va a devolver el context
//Creo variables globales, accder a un valor en cualquier lado de mi aplicación
const useAuth = () => {
  const context = useContext(authContext);
  return context;
  //creo un hook personalizado q(useAuth) me va a permitir poder llamar directamente los valores sin llamar al useContext y context
  //y me da la información del usuario
};
//authprovider nos permite usar todas las propiedades en cualquier componente.
const AuthProvider = ({ children }) => {
  const signUp = async (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
//le paso los parametro según la documentación y esto va a enviar mis datos a fb
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
    //uso authContext para retornar un provider, el que va a servir para
    //que adentro pongamos componentes como login y demás, y todo lo que tenga este provider
    //los hijos podrán accederlo, todo componente hijo podrá acceder a este componente padre
  );
};
export { AuthProvider, useAuth, authContext };
