

import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import ObtenerDetalle from "@/components/DetallePelicula";

const inter = Inter({ subsets: ["latin"] });

export default function Detalle({params}) {
    const {id}=params;
    
  return (
    <main className={styles.main}>
      
     <ObtenerDetalle id={id} />
    
    </main>
  );
}
