import { children, createContext, useContext, useEffect, useState } from 'react'
import { GoogleAuthProvider,signInWithPopup, createUserWithEmailAndPassword ,signInWithEmailAndPassword,signOut,onAuthStateChanged} from "firebase/auth";
import { auth } from '../firebase/firebase.config';

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}
export  const GoogleProvider= new GoogleAuthProvider(); 

export const AuthProvider = ({ children }) => {

    const [currentUser,setCurrentUser]=useState(null);
    const [loading,setLoading]=useState(true)

    const registerUser=async(email,password)=>{
       return createUserWithEmailAndPassword(auth, email, password)
    }
    const LoginUser=async(email,password)=>{
       return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle =async()=>{
        return signInWithPopup(auth, GoogleProvider);
    }

    const logout =async()=>{
        return  signOut(auth)
    }

    useEffect(()=>{
     const unsubscribe=   onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false)

        if(user)
        {
          const{email,displayName,photoURL}=  user

          const userData={
            email,username:displayName,photo:photoURL
          } 
        }

     })
     return()=>unsubscribe()
    },[])





    const value = {
        currentUser,
        loading,
        registerUser, 
        LoginUser,
        signInWithGoogle,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}