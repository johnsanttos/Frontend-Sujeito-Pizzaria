import { destroyCookie } from "nookies";
import Router from "next/router";
import { createContext, ReactNode, useState } from "react"

type AuthContextData = {
    user: UserProps
    isAutheticated: boolean
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void
}

type UserProps = {
    id: string
    name: string
    email: string
}

type SignInProps = {
    email: string
    password: string
}

type AuthProviderProps = {
    children: ReactNode
}
//Children é nossas paginas que esta dentro do contexto

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined,'@nextauth.token')
        Router.push('/')
    } catch{
        console.log('erro ao deslogar')
    }
}


export function AuthProvider({ children }: AuthProviderProps) {

    const [user,setUser] = useState <UserProps>()
    //!!user duas esclamações antes da variavel significa que esta convertendo em booleano, se user estiver vazio vai converter para falso, se tiver algo na varialvel sera true, estara logado
    const isAutheticated = !!user

   async function signIn({email,password}: SignInProps) {
      
    console.log( 'Dados email ', email)
    console.log( 'Dados password ', password)
    }


    return (
        <AuthContext.Provider value={{user,isAutheticated, signIn , signOut}}>
            {children}
        </AuthContext.Provider>
    )
}