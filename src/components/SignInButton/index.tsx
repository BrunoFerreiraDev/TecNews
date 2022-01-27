import { FaGithub } from 'react-icons/fa'// icons
import { FiX } from 'react-icons/fi'// icons
import { signIn, signOut, useSession } from 'next-auth/client'

import styles from './styles.module.scss'
import { useContext } from 'react';
import { themaContext } from '../../themaContext';

export function SignInButton() {
    const [session] = useSession();
    const dataContext =  useContext(themaContext)
    return session ? (
        <button
            type="button"
            className={styles.signInButton}
            id={dataContext.stateTheme === 'light' ? styles.light : ''}
            onClick={() => signOut()}
        >
            <FaGithub color="#04d361" />
            {session.user.name}
            <FiX
                color="#737380"
                className={styles.closeIcon}
            />
        </button>
    ) : (
        <button
            type="button"
            className={styles.signInButton}
            onClick={() => signIn('github')}
        >
            <FaGithub color="#eba417" />
            Sign in with Github
        </button>
    )
}