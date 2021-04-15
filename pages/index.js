import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Prismic from "prismic-javascript"
import { client } from "../prismic-configuration"
import { RichText } from "prismic-reactjs"
import formatPrismicDate from './formatPrismicDate.js'

// import Layout from '../components/layout'
import style from './Home.module.css'

export default function Home(props) {

   const [showModal, setShowModal] = useState(false)
   const [videoURL, setVideoURL] = useState(null)
      
   let cards = props.content.results.filter(item => item.data.news_card)
   const news_cards = cards.map((result) =>
      
      result.data.news_card && result.data.content_type == 'video' ?
         
         <div key={result.uid} className={style.card}
            onClick={() => setVideoURL(result.data.video_link[0].text)}
         >
            <a>
               <p className={style.date}>{formatPrismicDate(result.data.date)}</p>
               <img src={result.data.img.url} onClick={() => setShowModal(true)}/>
               {RichText.render(result.data.news_card_blurb)}
               <span className={style.arrow}>&rarr;</span>
            </a>
         </div> :

      (result.data.news_card && result.data.content_type !== 'video') ?
            
         <div key={result.uid} className={style.card}>
            {/* <Link href={`/${result.data.content_type.substr(0, 5)}/${result.uid}`} > */}
               <a>
                  <p className={style.date}>{formatPrismicDate(result.data.date)}</p>
                  <img src={result.data.img.url}/>
                  {RichText.render(result.data.news_card_blurb)}
                  <span className={style.arrow}>&rarr;</span>
               </a>
            {/* </Link> */}
         </div> : ''
   )      

   return (
         <div className={style.container}>
            
            <main className={style.main}>
               {/* <img className={style.banner} src={'/images/home_banner.jpg'}/> */}
               <div className={style.grid}>
                  {news_cards}
                </div>
   
               
            </main>
          </div>
   )
}

export async function getStaticProps() {
   const content = await client.query(
      Prismic.Predicates.at("document.type", "content"),
      {
         orderings: '[my.content.date desc]',
         pageSize : 100
      }
   )
   return {
      props: {
         content
      },
   }
}