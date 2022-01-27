import { getPrismicClient } from "../../../services/prismic"
import { RichText } from "prismic-dom"

import Head from "next/head"
import { GetStaticPaths, GetStaticProps } from "next"

import styles from '../../posts/post.module.scss'
import Link from "next/link"
import { useSession } from "next-auth/client"
import { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { themaContext } from "../../../themaContext"

interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function PostPreview({ post }: PostPreviewProps) {
    const dataContext = useContext(themaContext)

    const [session] = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`)
            return
        }

    }, [session])

    return (
        <>
            <main  id={dataContext.stateTheme === 'light' ? styles.light : ''}>
                <div className={styles.container}>
            <Head>
                <title>{post.title} | TecNews</title>
            </Head>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div
                        className={`${styles.postContent} ${styles.previewContent}`}
                        dangerouslySetInnerHTML={{ __html: post.content }} />{/*change the content inner of the element*/}


                    <div className={styles.continueReading}>
                        Wanna contunue  reading?
                        <Link href="/">
                            <a href=""> Subscribe now 🤗</a>
                        </Link>
                    </div>
                </article>
                </div>
            </main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params

    const prismic = getPrismicClient()

    const response = await prismic.getByUID('publication', String(slug), {})

    const post = {
        slug,
        title: RichText.asText(response.data.title),// get the title os the post
        content: RichText.asHtml(response.data.content.splice(0, 3)),//get the three first paragraph of the content
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props: {
            post,
        },
        revalidate: 60 * 30, //30 minutes
    }
}