import React from 'react'
import { client } from '../prismic-configuration'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs';

export default function Slug({ data }) {
   console.log(data)
   return (
      <div>
         {RichText.render(data.content_body)}
      </div>
   )
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
