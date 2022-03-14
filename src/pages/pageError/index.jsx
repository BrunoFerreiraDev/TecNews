import styles from './styles.module.scss'
import { useContext } from "react"
import { themaContext } from '../../themaContext'


export default function PageError(){

  const thema = useContext(themaContext)


    return (

    <body className={styles.body}>
        <main id={thema.stateTheme === 'light' ? styles.light : ''}>
            <div className={styles.contentContainer}>

            <h1>você precisa logar com email publico para processeguir com essa etapa</h1>
            <img id={styles.img} src="./email.jpeg" alt="email" />
            </div>
        </main>
    </body>
    )
}