import {createContext, ReactNode, useEffect, useState } from 'react';

//Importações relativas a autenticação de usuário com Google
import { signInWithPopup,
    GoogleAuthProvider }                               from 'firebase/auth';
import { auth, provider }                              from '../services/firebase';

type User = {
    id:     string;
    name:   string;
    avatar: string;
  }
  
type authContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
  }

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as authContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    
    const [user, setUser] = useState<User>();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if(user){
          const { displayName, photoURL, uid } = user;
  
          if (!displayName || !photoURL){
            throw new Error('Missing information from Google account');
          }
  
          setUser({ 
            id: uid,
            name: displayName,
            avatar: photoURL,
          });
        }
      })
  
      return () => {
        unsubscribe();
      }
  
    }, []);
    
  
    async function signInWithGoogle(){
        
        const result = await signInWithPopup( auth, provider);
  
        if(result.user){
          const { displayName, photoURL, uid } = result.user;
  
          if (!displayName || !photoURL){
            throw new Error('Missing information from Google account');
            
        }
  
        setUser({ 
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
  
        }
    }
    
    return(
        <AuthContext.Provider value = {{ user, signInWithGoogle }}>
            {props.children} 
        </AuthContext.Provider>

    );
}