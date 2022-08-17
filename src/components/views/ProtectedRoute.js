import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const user =JSON.parse(localStorage.getItem('currentUser'))
  if(!user) return <Navigate to='/'/>
  return <>{children}</>
}
