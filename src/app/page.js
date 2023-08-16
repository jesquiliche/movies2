"use client";
import Busqueda from "@/components/busqueda";
import styles from "./page.module.css";
import CargarPopulares from "@/components/CargarPopulars";
import Animacion from "@/components/animacion";

export default function Home() {
  return (
    <main className={styles.main}>
      <Busqueda />
    
        <CargarPopulares />
      
    </main>
  );
}
