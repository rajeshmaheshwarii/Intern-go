import Head from "next/head";
// Import Inter font from Google Fonts
import { Inter } from 'next/font/google';

import styles from "@/styles/Home.module.css";
import Home from './Home';


export default function HomePage() {
  
  return (
    <>
      <Head>
        <title>InternGo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/aiml.jpeg" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,276&display=swap" rel="stylesheet" />
      </Head>
      <main className={styles.main}>
       <Home />
      </main>
    </>
  );
}
