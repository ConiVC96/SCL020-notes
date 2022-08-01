import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const user =JSON.parse(localStorage.getItem('currentUser'))
  console.log(user)
  if(!user) return <Navigate to='/'/>
  return <>{children}</>
}
