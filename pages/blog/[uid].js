import React, { useState } from "react"
import Link from "next/link"

import Prismic from "prismic-javascript"
import { client } from "../../prismic-configuration"
import { RichText } from "prismic-reactjs"

import Layout from "../../components/layout"
import Modal from "../../components/modal"
import style from "./post.module.css"

export default function Post({ data }) {
console.log(data.img)
   const [showModal, setShowModal] = useState(false)

   

   return (
      <Layout>
         <div className={style.container}>
         <Link href="/blog"><h4>&larr; &nbsp;<a>blog home</a></h4></Link>
            {data.video_link.length !== 0 ?
               <article>
                  {/* <h3>{formatPrismicDate(data.date)}</h3> */}
                  <img onClick={() => setShowModal(true)} src={data.img.url} style={{ maxHeight: "15rem" }} />
                  <main>{RichText.render(data.content_body)}</main>
               </article> :
               <article>
                  {/* <h3>{formatPrismicDate(data.date)}</h3> */}
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
