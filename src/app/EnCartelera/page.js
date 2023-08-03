import styles from "./page.module.css";
import Cartelera from '@/components/Cartelera';

export default function Home() {
  return (
    <main className={styles.main}>
      <Cartelera/>   
    </main>

    )
}
