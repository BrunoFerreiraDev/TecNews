import { GetStaticProps } from "next"
import Head from "next/head"
import { SubscribeButton } from "../components/SubscribeButton"
import { stripe } from "../services/stripe"

import styles from './home.module.scss'

//no React há 3 formas de renderizar dados
//client side
//server side 
//static

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (

    <>
      <Head>
        <title>Home | TecNews</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

//SSR(server side Rendering)
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JncqMLy81ZRiRHZwxB1K4SE', {
    expand: ['product']// fala para a requisição que quer todos os campos do objeto
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'brl'
    }).format(price.unit_amount / 100)
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,//24 hours
  }
}