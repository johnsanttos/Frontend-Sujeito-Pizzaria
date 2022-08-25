import Head from "../../node_modules/next/head";

import Image from "../../node_modules/next/image";

import styles from '../../styles/home.module.scss'

import { Button } from "../components/ui/Button/index";

import { Input } from "../components/ui/input/index";

import logoimg from '../../public/logo.svg'



export default function Home() {
  return (
    <>

      <Head>
        <title>SujeitoPizza - Faça seu login </title>
      </Head>

      <div className={styles.containerCenter} >


        <Image src={logoimg} alt={"Logo Sujeito Pizzaria"} />

        <div className="styles.login">

          <form>
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

              Acessar
            </Button>
          </form>

        </div>


      </div>

    </>
  )
}
