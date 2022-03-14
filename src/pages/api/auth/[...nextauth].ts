import { query as q } from 'faunadb'

import NextAuth from "next-auth"
import Provider from "next-auth/providers"
import { fauna } from '../../../services/fauna'

export default NextAuth({
    
    // Configure one or more authentication providers
    providers: [
        Provider.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            scope: 'read:user'
        }),
        // ...add more providers here
    ],
    

    callbacks: {
        async session(session) {
            try {
                const userActiveSubscription = await fauna.query(
                    q.Get(
                        q.Intersection([
                            q.Match(
                                q.Index('subscription_by_user_ref'),
                                q.Select(
                                    "ref",
                                    q.Get(
                                        q.Match(
                                            q.Index('user_by_email'),
                                            q.Casefold(session.user.email)
                                        )
                                    )
                                )
                            ),
                            q.Match(
                                q.Index('subscription_by_status'),
                                "active"
                            )
                        ])
                    )
                )

                return {
                    ...session,
                    activeSubscription: userActiveSubscription
                }

            } catch {
                return {
                    ...session,
                    activeSubscription: null
                }
            }
        },
        async signIn(user, account, profile) {
               
                const {email} = user
            
            try {
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(user.name)
                                )
                            )
                        ),
                        q.Create(//inserção dentro do fauna
                            q.Collection('users'),//qual colection receberá os dados
                            { data: { email } }//os dados
                        ),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(user.name)
                            )
                        )
                    )

                )
                return true

            } catch {
                return false
            }

        },
    }
})