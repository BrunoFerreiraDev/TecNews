import styles from './styles.module.scss'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import { getPrismicClietn } from '../../services/prismic'

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

    console.log(posts[0].updatedAt);

    return (
        <>
            <Head>
                <title>Posts | Tecnews</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    {
                        posts.map(post => (
                            <a key={post.slug} href='#'>
                                <time>
                                    {post.updatedAt}
                                </time>
                                <strong>{post.title}</strong>
                                <p>{post.excerpt}</p>
                            </a>
                        ))
                    }
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClietn();

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