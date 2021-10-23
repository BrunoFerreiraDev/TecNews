import Stripe from 'stripe'//biblioteca para facilitar as requisições do stripe
export const stripe = new Stripe(
    process.env.STRIPE_API_KEY,


    {
        apiVersion: '2020-08-27',
        appInfo: {
            name: 'TecNews',
            version: '0.1.0'
        },
    }
)