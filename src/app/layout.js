import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Movies',
  description: 'Catalogo películas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
      <Navigation/>
              {children}
      <Footer/>
      </body>
    </html>
  )
}
