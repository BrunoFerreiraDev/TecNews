import { getPrismicClient } from '../../services/prismic'
import { RichText } from 'prismic-dom'
import Prismic from '@prismicio/client'

import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import styles from './styles.module.scss'
import { useContext } from 'react'
import { themaContext } from '../../themaContext'

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
};

interface PostProps {
    posts: Post[]
}

export default function Posts({ posts }: PostProps) {

    const dataContext = useContext(themaContext)

    return (
        <>
            <Head>
                <title>Posts | Tecnews</title>
            </Head>
            <main  id={dataContext.stateTheme === 'light' ? styles.light : ''}>
                <div className={styles.container}>
                <div className={styles.posts}>
                    {
                        posts.map(post => (
                            <Link key={post.slug} href={`/posts/${post.slug}`}>
                                <a href='#'>
                                    <time>
                                        {post.updatedAt}
                                    </time>
                                    <strong>{post.title}</strong>
                                    <p>{post.excerpt}</p>
                                </a>
                            </Link>
                        ))
                    }
                </div>
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.query(
        [Prismic.predicates.at('document.type', 'publication')],
        {
            fetch: ['publication.title', 'publication.content'],
            pageSize: 100,
        }
    )

    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })
    console.log(posts);


    return {
        props: {
            posts
        }
    }
}