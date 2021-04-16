import React from 'react'

import { client } from '../../prismic-configuration'
import { RichText } from 'prismic-reactjs'

import style from './contact.module.css'
import Layout from '../../components/layout'

export default function Contact(props) {
   
   return (
      <Layout>
         <div className={style.container}>
            <div className={style.contact_container}>
               {RichText.render(props.contact.data.contact_body)}
            </div>
         </div>
      </Layout>
   )
}

export async function getStaticProps() {
   const contact = await client.getSingle("contact")
   return {
      props: {
         contact
      }
   }
}
