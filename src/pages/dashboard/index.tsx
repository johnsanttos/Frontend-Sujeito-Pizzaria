import Head from "next/head"
import {FiRefreshCcw} from 'react-icons/fi'
import { Header } from "../../components/Header"
import { canSSRAuth } from "../../utils/canSSRAuth"
import styles from './styles.module.scss'

export default function Dashboard (){
	return (
	<>
	<Head>
		<title>Painel - Sujeito Pissaria </title>
	</Head>

	<div>
		<Header/>
		
		<main className={styles.container}>

			<div className={styles.containerHeader}>
				<h1> Últimos pedidos</h1>
				<button>
				<FiRefreshCcw size={25} color='#3fffa3'/>
				</button>

			</div>

			<article className={styles.listOrders}>

			<section className={styles.orderItem} >
				<button>
					<div className={styles.tag}>
						
					</div>
					<span> Mesa 30</span>
				</button>
			</section>
			</article>

		</main>
		
	</div>
	</>
	)
}

export const getServerSideProps = canSSRAuth (async (ctx) =>{
return {
	props: {}
}

})