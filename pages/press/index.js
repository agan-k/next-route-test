import  React  from 'react'
import Head from 'next/head'
import Link from "next/link"

import Prismic from "prismic-javascript"
import { client } from "../../prismic-configuration"
import { RichText } from "prismic-reactjs"

import Layout from '../../components/layout'
import styles from './press.module.css'

export default function Press(props) {

   const press_reviews = props.content.results.filter(result => 
      result.data.content_type == 'press-reviews'
   )
   const press_releases = props.content.results.filter(result => 
      result.data.content_type == 'press-releases'
   )
   const press_interviews = props.content.results.filter(result => 
      result.data.content_type == 'press-interviews'
   )
   const press_features = props.content.results.filter(result => 
      result.data.content_type == 'press-features'
   )

   function getContentPaths(currentContentType) {
      const path = currentContentType.map(result => 
         result.data.content_type.substr(0, 5)
         );
      return path[0];
   }
   
   return (
      <Layout>
            <div className={styles.container}>
               <h1>reviews</h1>
               <ul>
                  {press_reviews.map(result => 
                     <li key={result.uid}>
                        {RichText.render(result.data.content_body.filter(item => item.type == 'heading3'))}&nbsp;
                        <Link href="/press/[id]" as={`/${getContentPaths(press_reviews)}/${result.uid}`}>
                           <a>
                              {RichText.render(result.data.content_body.filter(item => item.type == 'heading4'))}
                           </a>
                           </Link>
                        </li>
                     )}
               </ul>
               <hr />
               
               <h1>interviews</h1>
               <ul>
                  {press_interviews.map(result => 
                     <li key={result.uid}>
                        {RichText.render(result.data.content_body.filter(item => item.type == 'heading3'))}&nbsp;
                        <Link href="/press/[id]" as={`/${getContentPaths(press_interviews)}/${result.uid}`}>
                           <a>
                              {RichText.render(result.data.content_body.filter(item => item.type == 'heading4'))}
                           </a>
                        </Link>
                     </li>
                  )}
               </ul>
               <hr />
               
               <h1>press releases</h1>
               <ul>
                  {press_releases.map(result => 
                     <li key={result.uid}>
                        {RichText.render(result.data.content_body.filter(item => item.type == 'heading3'))}&nbsp;
                        <Link href="/press/[id]" as={`/${getContentPaths(press_releases)}/${result.uid}`}>
                           <a>
                              {RichText.render(result.data.content_body.filter(item => item.type == 'heading4'))}
                           </a>
                        </Link>
                     </li>
                  )}
               </ul>
            <hr/>
               <h1>features</h1>
               <ul>
                  {press_features.map(result => 
                     <li key={result.uid}>
                        {RichText.render(result.data.content_body.filter(item => item.type == 'heading3'))}&nbsp;
                        <Link href="/press/[id]" as={`/${getContentPaths(press_features)}/${result.uid}`}>
                           <a>
                              {RichText.render(result.data.content_body.filter(item => item.type == 'heading4'))}
                           </a>
                        </Link>
                     </li>
                  )}
               </ul>
            <hr/>
            </div>
      </Layout>
   )
}
export async function getStaticProps() {
   const content = await client.query(
      Prismic.Predicates.at("document.type", "content"),
      { pageSize: 100 }
   );
   return {
      props: {
         content
      },
   };
}

