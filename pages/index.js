import React, { useState } from 'react'
import Link from 'next/link'

import Prismic from "prismic-javascript"
import { client } from "../prismic-configuration"
import { RichText } from "prismic-reactjs"

import style from './Home.module.css'
import Layout from '../components/layout'
import Modal from '../components/modal'

export default function Home(props) {

   const [showModal, setShowModal] = useState(false)
   const [videoURL, setVideoURL] = useState(null)


   function formatPrismicDate(date) {
      let months = ["January","February","March","April","May","June","July",
         "August", "September", "October", "November", "December"];
      let day;
      let month;
      let year = date.slice(0, 4);
   
      if (date.charAt(8) == '0') {
         day = date.slice(9, 10);
      }
      else {
         day = date.slice(8, 10);
      }
      if (date.charAt(5) == '0') {
         month = months[date.slice(6, 7) - 1];
      }
      else {
         month = months[date.slice(5, 7) -1]
      }
      return day + '. ' + month + ' ' + year;
   }

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
            <Link href={`/${result.data.content_type.substr(0, 5)}/${result.uid}`} >
               <a>
                  <p className={style.date}>{formatPrismicDate(result.data.date)}</p>
                  <img src={result.data.img.url}/>
                  {RichText.render(result.data.news_card_blurb)}
                  <span className={style.arrow}>&rarr;</span>
               </a>
            </Link>
         </div> : ''
   ) 
   
   return (
      <Layout>
         <h1>last commit -m "move formatPrismicDate outside of Post function"</h1>
         <div className={style.container}>
            
            <main className={style.main}>
               <img className={style.banner} src={'/images/home_banner.jpg'}/>
               <div className={style.grid}>
                  {news_cards}
                </div>
   
               {showModal && (
                  <Modal
                     news_card_video_url={videoURL}
                     closeModal={() => setShowModal(false)}
                  />
               )}
            </main>
          </div>
      </Layout>
   )
}

export async function getStaticProps() {
   const content = await client.query(
      Prismic.Predicates.at("document.type", "content"),
      {pageSize : 100}
   )
   return {
      props: {
         content
      },
   }
}