import React from 'react'

import Prismic from "prismic-javascript";
import { client } from "../../prismic-configuration";
import { RichText } from "prismic-reactjs";

export default function pressArticle({ data }) {
   return (
     <div>
       <article>
         <img src={data.img.url} style={{maxHeight: '3rem'}}/>
         <main>{RichText.render(data.content_body)}</main>
       </article>
      </div>
   );
 }

export async function getStaticProps({ params }) {
   const { uid } = params;
   const { data } = await client.getByUID("content", uid);
   return {
      props: { data }
   }
 }

export async function getStaticPaths() {
  const { results } = await client.query(
     Prismic.Predicates.at("document.type", "content"),
     { pageSize: 100 }
  )
  const paths = results.map(result => ({
    params: {
      uid: result.uid,
    }
  }))
  return {
    paths,
    fallback: false
  }
}