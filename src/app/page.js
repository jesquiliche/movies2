'use client'
import Busqueda from '@/components/busqueda'

import styles from "./page.module.css";
import CargarPopulares from '@/components/CargarPopulars';

export default function Home() {
  return (
    <main className={styles.main}>
      
        <Busqueda/>
    
    <CargarPopulares/>
    
      
    </main>

    )
}
