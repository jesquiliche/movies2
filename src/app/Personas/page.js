import styles from "./page.module.css";
import Personas from "@/components/Personas";

export default function Home() {
  return (
    <main className={styles.main}>
      <Personas/>   
    </main>

    )
}
