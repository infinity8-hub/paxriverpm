import { Source_Sans_3, Lusitana } from 'next/font/google'

export const lusitanaTitle = Lusitana({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',
    fallback: ['sans-serif'],
})

export const sourceSans = Source_Sans_3({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    fallback: ['system-ui', 'Arial', 'sans-serif'],
    variable: '--font-source-sans-3',
})