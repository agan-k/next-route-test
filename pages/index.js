import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Prismic from "prismic-javascript"
import { client } from "../prismic-configuration"
import { RichText } from "prismic-reactjs"

import style from './Home.module.css'
import Layout from '../components/layout'

export default function Home(props) {

   const content = props.content.results.map(result => result)
  
   console.log(content)    
   return (
      <Layout>
         <div className={style.container}>
            <h1>last commit -m "remove Home content"</h1>
   
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