import { destroyCookie, setCookie, parseCookies } from 'nookies'
import { api } from '../services/apiClient'
import Router from 'next/router'
import { createContext, ReactNode, useState } from 'react'

type AuthContextData = {
  user: UserProps
  isAutheticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => void
  signUp: (credentials: SignUpProps) => Promise <void>
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

type SignUpProps ={
  name: string,
  email: string,
  password: string

}
type AuthProviderProps = {
  children: ReactNode
}
//Children é nossas paginas que esta dentro do contexto

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.token')
    //destroyCookie vai destruir o token usuario salvo em '@nextauth.token'
    Router.push('/')
  } catch {
    console.log('erro ao deslogar')
  }
}



export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  //!!user duas esclamações antes da variavel significa que esta convertendo em booleano, se user estiver vazio vai converter para falso, se tiver algo na varialvel sera true, estara logado
  const isAutheticated = !!user

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/session', {
        email,
        password,
      })

      //descontruindo response.data
      const { id, name, token } = response.data
 
      // console.log('ariosvaldo ', response.data)

      //salvando o token no cookies
      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, //expirar em 1 mes
        path: '/', // quais caminhos terao acesso ao cookies "/" significa todes
      })

      setUser({
        id,
        name,
        email,
      })
      // passar para as proximas resições o nosso token
      api.defaults.headers['authorizathion'] = `Bearer ${token}`

      //redirecionar para a /dashboard
      Router.push('/dashboard')
      
    } catch (err) {
      console.log('ERRO AO ACESSAR ', err)
    }
  }

  async function signUp({name,email,password}:SignUpProps){
try{

  const response = await api.post('/users' , {
    name,
    email,
    password
  })

  console.log('CADASTRADO COM SUCESSO!')

  Router.push('/')

}catch(err){
  console.log('ERRO AO CADASTRAR' , err)
}
  }
  return (
    <AuthContext.Provider value={{ user, isAutheticated, signIn, signOut, signUp}}>
      {children}
    </AuthContext.Provider>
  )
}
