import React from 'react'
import Link from 'next/link'

import Prismic from 'prismic-javascript'
import { client } from '../../prismic-configuration'

import style from './discography.module.css'
import Layout from '../../components/layout'

export default function Discography(props) {
   
   const discography = props.content.results.filter(result =>
      result.data.content_type == 'discography'
      )
   
   const albums_gallery = discography.map(album => 
      <div key={album.uid} className={style.album_container}>
         <Link href="disco/[id]" as={`disco/${album.uid}`}>
            <img src={album.data.img.url} />
         </Link>
      </div>
   )
   
   return (
      <Layout>
         <div className={style.container}>
            <div className={style.gallery_container}>
               {albums_gallery}
            </div>
         </div>
      </Layout>
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
      }
   }
}
