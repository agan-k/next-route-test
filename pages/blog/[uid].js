import React, { useState } from "react"
import Link from "next/link"

import Prismic from "prismic-javascript"
import { client } from "../../prismic-configuration"
import { RichText } from "prismic-reactjs"

import Layout from "../../components/layout"
import Modal from "../../components/modal"
import formatPrismicDate from '../formatPrismicDate.js'
import style from "./post.module.css"

export default function Post({ data }) {
   const [showModal, setShowModal] = useState(false)
   console.log(data)
   return (
      <Layout>
         <div className={style.container}>
         {/* <Link href="/blog"><h4>&larr; &nbsp;<a>blog home</a></h4></Link> */}
            {data.video_link.length !== 0 ?
               <article>
                  <h3>{formatPrismicDate(data.date)}</h3>
                  <img onClick={() => setShowModal(true)} src={data.img.url} style={{ maxHeight: "15rem" }} />
                  <main>{RichText.render(data.content_body)}</main>
               </article> :
               <article>
                  <h3>{formatPrismicDate(data.date)}</h3>
                  <img src={data.img.url} style={{ maxHeight: "15rem" }} />
                  <main>{RichText.render(data.content_body)}</main>
               </article>
            }
            {showModal && (
               <Modal blog_video_url={data.video_link[0].text}
                  closeModal={() => setShowModal(false)}
               />
            )}
         </div>
      </Layout>
   )
}

export async function getStaticProps({ params }) {
   const { uid } = params;
   const { data } = await client.getByUID("content", uid);
   return {
      props: { data },
   };
}

export async function getStaticPaths() {
   const { results } = await client.query(
      Prismic.Predicates.at("document.type", "content"),
      {pageSize : 100}
   )
   const paths = results.map(result => ({
      params: {
         uid: result.uid
      }
   }))
   return {
      paths,
      fallback: false,
   }
}
