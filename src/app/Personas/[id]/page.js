

import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Persona from "@/components/Persona";

const inter = Inter({ subsets: ["latin"] });

export default function Detalle({params}) {
    const {id}=params;
    
  return (
    <main className={styles.main}>
      
     <Persona id={id} />
    
    </main>
  );
}
