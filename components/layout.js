import React, { useState } from "react"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"

import style from "./layout.module.css"

export default function Layout({ children }) {
   const [navShow, setNavShow] = useState(false)
   const router = useRouter()
   const navLinksData = [
      {name: 'news', uid: '/'},
      {name: 'bio', uid: '/bio'},
      {name: 'blog', uid: '/blog'},
      {name: 'shows', uid: '/shows'},
      {name: 'press', uid: '/press'},
      {name: 'photos', uid: '/photos'},
      {name: 'videos', uid: '/videos'},
      {name: 'discography', uid: '/disco'},
      {name: 'store', uid: '/#'},
      {name: 'links', uid: '/links'},
      {name: 'contact', uid: '/contact'},
   ]
   const links = navLinksData.map(link =>
      <li key={link.uid} className={router.pathname == `${link.uid}` ? 'active_nav_links' : ''}>
         <Link href={link.uid}><a>{link.name}</a></Link>
      </li>
      )
   return (
      <div className={style.container}>
         <Head>
           <title>RajivJayaweera</title>
           <link rel="icon" href="/favicon.ico" />
         </Head>
         <header className={style.header}>
            <div className={style.nav_container}>
               {router.pathname !== '/' ?
                  <Link href='/'><a><h1>RajivJayaweera.com</h1></a></Link> :
                  <h1>RajivJayaweera.com</h1>
               }
               <div className={style['mobile_nav_toggle']} onClick={() => setNavShow(!navShow)}>
                  <div className={!navShow ? style['open_icon'] : style['close_icon']}>
                     
                  </div>
               </div>
            </div>
               <ul className={navShow ? style['nav_links_open'] : style['nav_links']}>
                  {links}
               </ul>
         </header>
         <main className={style['main']}>
            {children}
         </main>
         <footer className={style.footer}>Site by
              <a
                href="https://formversuscontent.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                &nbsp;{'FormVsContent'}
              </a>
            </footer>
      </div>
   )
}
