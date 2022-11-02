import Head from "next/head";

import Image from "next/image";

import styles from '../../../styles/home.module.scss';

import { Button } from "../../components/ui/Button/index";

import { Input } from "../../components/ui/Input/index";

import Link from "next/link";

import logoimg from '../../../public/logo.svg'



export default function SignUp() {
  return (
    <>

      <Head>
        <title>SujeitoPizza - Faça seu cadastro agora </title>
      </Head>

      <div className={styles.containerCenter} >


        <Image src={logoimg} alt={"Logo Sujeito Pizzaria"} />

        <div className={styles.login}>
          <h1> Criando sua conta</h1>

          <form>

            <Input
              placeholder="Digite seu nome "
              type="text"
            />

            <Input
              placeholder="Digite seu email"
              type="text"
            />

            <Input
              placeholder="Sua senha"
              type="password"
            />

            <Button
              type="submit"
              loading={false}
            >

              Cadastrar
            </Button>
          </form>

          <Link
            href="/">
            <a className={styles.text}> Já possui uma conta? Faça login!</a>
          </Link>
        </div>


      </div>

    </>
  )
}
