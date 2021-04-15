import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Prismic from "prismic-javascript"
import { client } from "../prismic-configuration"
import { RichText } from "prismic-reactjs"

// import Layout from '../components/layout'
import style from './Home.module.css'

export default function Home(props) {
   console.log(props.content.results[0].data.date)    

   return (
         <div className={style.container}>
            <h1>{props.content.results[0].data.date}</h1>
          </div>
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
      },
   }
}