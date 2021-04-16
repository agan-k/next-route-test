import React, { useState } from 'react'
import Link from 'next/link'

import Prismic from 'prismic-javascript'
import { client } from '../../prismic-configuration'
import { RichText } from "prismic-reactjs"

import Layout from '../../components/layout'
import style from './videos.module.css'
import Modal from '../../components/modal'

export default function Videos(props) {
   const [showModal, setShowModal] = useState(false)
   const [videoURL, setVideoURL] = useState(null)
   
   const videos = props.content.results.filter(result =>
      result.data.content_type == 'video'
   )

   const gallery = videos.map((video) =>
      <div className={style.video_container} key={video.uid}
         onClick={() => setVideoURL(video.data.video_link[0].text)}
      >
         <img onClick={() => setShowModal(true)} src={video.data.img.url} />
         {RichText.render(video.data.video_caption)}
      </div>
   )
   
   return (
      <Layout>
         <div>
            <div className={style.gallery_container}>
               {gallery}
            </div>
            {showModal && (
               <Modal
                  videos={true}
                  video_url={videoURL}
                  closeModal={() => setShowModal(false)}
               />
            )}
         </div>
      </Layout>
   )
   
}
export async function getStaticProps() {
   const content = await client.query(
      Prismic.Predicates.at("document.type", "content"),
      { pageSize : 100 }
      )
      return {
         props: {
            content
         }
      }
}