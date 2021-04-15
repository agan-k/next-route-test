import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Prismic from "prismic-javascript"
import { client } from "../prismic-configuration"
import { RichText } from "prismic-reactjs"

import style from './Home.module.css'

export default function Home(props) {
   const content = props.content.results.map(result => result)
   const test_content =  content.map(item =>
      <div key={item.data.id}>
         <Link href={`/${item.uid}`}>
            <h1>{item.data.date}</h1>
         </Link>
      </div>
      
      )
   console.log(content)    
   return (
      <div className={style.container}>
         <h1>last commit -m "import blog"</h1>
         <Link href="/blog">
            <h1>blog</h1>
         </Link>
         <h1>date</h1>
         {test_content}
          </div>
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