import { getPrismicClient } from "../../services/prismic"
import { RichText } from "prismic-dom"

import Head from "next/head"
import { getSession } from "next-auth/client"
import { GetServerSideProps } from "next"

import styles from '../posts/post.module.scss'
import { themaContext } from "../../themaContext"
import { useContext } from "react"

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function Post({ post }: PostProps) {
    const dataContext = useContext(themaContext)

    return (
        <>
            <Head>
                <title>{post.title} | TecNews</title>
            </Head>
            <main>
                <div className={styles.container} id={dataContext.stateTheme === 'light' ? styles.containerLight : ''}>
                <article className={styles.post} >
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div
                        className={styles.postContent}
                        dangerouslySetInnerHTML={{ __html: post.content }} />{/*change the content inner of the element*/}
                </article>
                </div>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req })
    const { slug } = params


    if (!session?.activeSubscription) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const prismic = getPrismicClient(req)

    const response = await prismic.getByUID('publication', String(slug), {})

    const post = {
        slug,
        title: RichText.asText(response.data?.title),// get the title os the post
        content: RichText.asHtml(response.data.content),//get the content of the pos and convert to html
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props: {
            post,
        }
    }
}