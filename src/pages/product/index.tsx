import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './styles.module.scss'
import Head from 'next/head'
import { toast } from 'react-toastify'
import { Header } from '../../components/Header'
import { FiUpload } from 'react-icons/fi'
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'

type ItemProps = {
  id: string
  name: string
}

// para tipar listas  categoryList: ItemProps[]
interface CategoryProps {
  categoryList: ItemProps[]
}

export default function Product({ categoryList }: CategoryProps) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  const [avatarUrl, setAvatarUrl] = useState('')
  const [imageVatar, setImageAvatar] = useState(null)

  const [categories, setCategories] = useState(categoryList || [])
  const [categorySelected, setCategorySelected] = useState(0)

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return
    }

    const image = e.target.files[0]
    if (!image) {
      return
    }

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setImageAvatar(image)
      //  URL.createObjectURL cria um html do objeto para o  preview ficticia para exibir image antes de mandar para o backend
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))
    }
  }
  //quando voce seleciona uma nova categoria na lista
  function handleChangeCategory(event) {
    //console.log ("POSIÇÃO DA CATEGORIA SELECIONADA" ,   event.target.value)
    //console.log ("Categoria selecionada" ,   categories[event.target.value])

    setCategorySelected(event.target.value)
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault()

    try {

      const data = new FormData()

      if(name === "" || price === "" || description === "" || imageVatar === null ){
        toast.error("Preencha todos os campos!")
        return
      }

      //append adicionar o item para requisição
      data.append('name' , name)
      data.append('price', price)
      data.append('description', description)
      data.append('category_id', categories[categorySelected].id )
      data.append ('file' , imageVatar)

      const apiClient = setupAPIClient();

      await apiClient.post('/product' , data )

      toast.success('Produto cadastrado com sucesso!')

    } catch (err) {
      console.log(err)
      toast.error('Ops erro ao cadastrar!')
    }

    //multipart formdata
    setName('')
    setPrice('')
    setDescription('')
    setImageAvatar(null)
    setAvatarUrl('')
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

          <form onSubmit={handleRegister} className={styles.form}>
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

            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                )
              })}
            </select>

            <input
              type="text"
              placeholder="Digite o nome do produto"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Preço do produto"
              className={styles.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <textarea
              placeholder="Descreva seu produto..."
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
      categoryList: response.data,
    },
  }
})
