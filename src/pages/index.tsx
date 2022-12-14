import { FormEvent, useContext, useState } from 'react'
import {toast }from 'react-toastify'
import Head from '../../node_modules/next/head'
import Image from '../../node_modules/next/image'
import styles from '../../styles/home.module.scss'
import { Button } from '../components/ui/Button/index'
import { Input } from '../components/ui/Input/index'
import Link from 'next/link'
import { AuthContext } from '../contexts/AuthContext'
import logoimg from '../../public/logo.svg'
import {GetServerSideProps} from 'next'
import { canSSRGuest } from '../utils/canSSRGuest'


export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPasword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()
    // event: FormEvent e event.preventDefault evita a pagina de recarregar sozinha qdo utilizamos formularios
    if (email === "" || password === "" ) {
      toast.error('Preencha todos os campos!')
          return
        }

        setLoading(true)
    let data = {
      email,
      password,
    }
    await signIn(data)

    setLoading(false)
  }


  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login </title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoimg} alt={'Logo Sujeito Pizzaria'} />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <Input
              placeholder="Sua senha"
              type="password"
              value={password}
              onChange={(event) => setPasword(event.target.value)}
            />

            <Button type="submit" loading={loading}>
              Acessar
            </Button>
          </form>

          <Link href="/signup">
            <a className={styles.text}> Não possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async(ctx) =>{
  return {
    props:{}
  }
})