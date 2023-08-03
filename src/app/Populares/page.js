import styles from "./page.module.css";
import MasPopulares from '@/components/MasPopulares';

export default function Home() {
  return (
    <main className={styles.main}>
      <MasPopulares/>   
    </main>

    )
}
