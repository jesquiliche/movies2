"use client";
import Busqueda from "@/components/busqueda";
import { motion } from "framer-motion";

import styles from "./page.module.css";
import CargarPopulares from "@/components/CargarPopulars";

export default function Home() {
  return (
    <main className={styles.main}>
      <motion.div
        className="items-center"
        initial={{ opacity: 0, scale: 0.2, rotate: -90 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Busqueda />

        <CargarPopulares />
      </motion.div>
    </main>
  );
}
