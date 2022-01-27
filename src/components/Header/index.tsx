import { useContext } from 'react'
import { themaContext } from '../../themaContext'
import { ActiveLink } from '../ActiveLink'
import { SignInButton } from '../SignInButton'

import iconSun from '../../../public/images/iconSun.png'
import iconMoon from '../../../public/images/iconMoon.png'
import styles from './styles.module.scss'
import Image from 'next/image'

export function Header() {
    const dataContext = useContext(themaContext)

    function onThemeTooggle() {
        if (dataContext.stateTheme === 'dark') {
            dataContext.setStateTheme('light')
        } else {
            dataContext.setStateTheme('dark')
        }

    }

    return (
        <header className={styles.headerContainer} id={dataContext.stateTheme === 'light' ? styles.light : ''}>
            <div className={styles.headerContent}>
                <button className={styles.tooggle} onClick={() => onThemeTooggle()}>
                    {dataContext.stateTheme === 'dark' ? <Image src={iconMoon} alt="icon da lua" /> : <Image src={iconSun} alt="icon do sol" />}
                </button>
                {dataContext.stateTheme === 'dark'? <img src="/images/TecNews.png" alt="tecnews" />:<img src="/images/TecNewsLight.png" alt="tecnews" />}
                <nav>
                    <ActiveLink activeClassName={styles.active} href="/">
                        <a >Home</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/posts">
                        <a >Post</a>
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header >
    )
}