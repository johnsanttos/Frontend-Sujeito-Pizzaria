import { FormEvent, useContext, useState } from 'react'
import Head from 'next/head'
import {toast }from 'react-toastify'
import Image from 'next/image'
import styles from '../../../styles/home.module.scss'
import { Button } from '../../components/ui/Button/index'
import { Input } from '../../components/ui/Input/index'
import { AuthContext, signOut } from '../../contexts/AuthContext'
import Link from 'next/link'
import logoimg from '../../../public/logo.svg'


export default function SignUp() {

const {signUp} = useContext(AuthContext)

  const [name, setName] = useState ('')
  const [email, setEmail] = useState ('')
  const [password, setPassword] = useState ('')
  const [loading, setLoading] = useState(false)

  async function HandleSignUp(event: FormEvent) {
    event.preventDefault() 
    
    if( name === "" || email === "" || password ==="") {
      toast.error('Preencha todos os campos!')
      return
    }
setLoading(true)
    let data ={
      name,email,password
    }

    await signUp(data)

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu cadastro agora </title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoimg} alt={'Logo Sujeito Pizzaria'} />

        <div className={styles.login}>
          <h1> Criando sua conta</h1>

          <form onSubmit={HandleSignUp}>
            <Input 
            placeholder="Digite seu nome " 
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            />

            <Input 
            placeholder="Digite seu email" 
            type="text" 
            value={email}
            onChange = {(event)=> setEmail(event.target.value)}
            />

            <Input 
            placeholder="Sua senha" 
            type="password" 
            value={password}
            onChange = {(event) => setPassword (event.target.value)}
            
            />

            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>

          <Link href="/">
            <a className={styles.text}> Já possui uma conta? Faça login!</a>
          </Link>
        </div>
      </div>
    </>
  )
}
