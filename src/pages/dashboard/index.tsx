import { useState } from 'react'
import Head from 'next/head'
import { FiRefreshCcw } from 'react-icons/fi'
import { Header } from '../../components/Header'
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'

type OrderProps = {
  id: string
  table: string | number
  status: boolean
  draft: boolean
  name: string | null
}

interface HomeProps {
  orders: OrderProps[]
}

export default function Dashboard({ orders }: HomeProps) {
  console.log('iaiaioo', orders)

  const [orderList, setOrderList] = useState(orders || [])

function handleOpenModalView(id:string){
	alert('opa')
}
  return (
    <>
      <Head>
        <title>Painel - Sujeito Pizzaria </title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1> Últimos pedidos</h1>
            <button>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>

          <article className={styles.listOrders}>

            {orderList.map((item) => (
              <section key={item.id} className={styles.orderItem}>
				{/* Foi passado o item.id para a função que vai chamar o modal */}
                <button onClick={ () => handleOpenModalView(item.id)}>
                  <div className={styles.tag}></div>
                  <span> Mesa {item.table}</span>
                </button>
              </section>
            ))}

          </article>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get('/orders')

  console.log('OIIII', JSON.stringify(response.data))

  return {
    props: {
      orders: response.data,
    },
  }
})
