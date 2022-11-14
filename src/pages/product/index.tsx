import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import Head from 'next/head'
import { Header } from '../../components/Header'
import { FiUpload } from 'react-icons/fi'
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { type } from 'os'

type ItemProps ={
  id: string,
  name: string
}

// para tipar listas  categoryList: ItemProps[]
interface CategoryProps {
  categoryList: ItemProps[]
}

export default function Product({categoryList}:CategoryProps) {

  console.log(categoryList)

  const [avatarUrl, setAvatarUrl] = useState('')
  const [imageVatar, setImageAvatar] = useState(null)

  const[categories, setCategories] = useState (categoryList || [])

  const[categorySelected, setCategorySelected] = useState(0)


  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return
    }

    const image = e.target.files[0]
    if (!image) {
      return
    }

    if(image.type === 'image/jpeg' || image.type === 'image/png') {

      setImageAvatar(image)
      //  URL.createObjectURL cria um html do objeto para o  preview ficticia para exibir image antes de mandar para o backend
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))

    }
  }
  //quando voce seleciona uma nova categoria na lista
  function handleChangeCategory(event){
    //console.log ("POSIÇÃO DA CATEGORIA SELECIONADA" ,   event.target.value)
    //console.log ("Categoria selecionada" ,   categories[event.target.value])

    setCategorySelected(event.target.value)

  }


  return (
    <>
      <Head>
        <title>Novo produto - Sujeito Pizzaria</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          
          <h1>Novo Produto</h1>

          <form className={styles.form}>

            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={30} color="#fff" />
              </span>

              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />

              {avatarUrl && (
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt=""
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select 
            value={categorySelected}
            onChange={handleChangeCategory}
            >
              {
                categories.map( (item, index)=>{
                return(
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                )
                }

                )
              }
             
            </select>

            <input
              type="text"
              placeholder="Digite o nome do produto"
              className={styles.input}
            />

            <input
              type="text"
              placeholder="Preço do produto"
              className={styles.input}
            />

            <textarea
              placeholder="Descreva seu produto..."
              className={styles.input}
            />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
const apiClient = setupAPIClient(ctx)

const response = await apiClient.get('/category')
//console.log(response.data)

  return {
    
    props: {
      categoryList: response.data
    },
  }
})
