import React from 'react'
import style from './modal.module.css'
import { RichText } from "prismic-reactjs"
import ReactPlayer from 'react-player'

export default function Modal(props) {
  
      let detail;
      if (props.photos) {
         detail = props.photo
      } else if (props.videos) {
         detail = props.video_url
      } else if (props.news_card_video_url) {
         detail = props.news_card_video_url
      } else if (props.blog_video_url) {
         detail = props.blog_video_url
      }
   
      function getImgClassName(dimensions) {
         if (dimensions.height > dimensions.width) {
            return 'vertical'
         } else {
            return 'horizontal'
         }
      }
   
      return (
         <div className={style.container} onClick={() => props.closeModal()}>
            {props.photos ?
               
               <div className={style.img_container}>
                  <img src={detail.img.url}
                     className={`${getImgClassName(detail.img.dimensions)}_img`}
                  />
                  {RichText.render(detail.photo_caption)}
                  <style jsx>{`
                     .vertical_img {
                        height: 80%;
                        margin-top: 5%;
                     }
                     .horizontal_img {
                        height: 60%;
                        margin-top: 10%;
                     }
                  `}</style>
               </div> :
               (props.videos || props.news_card_video_url || props.blog_video_url) ?
                  <div className={style.video_container}>
                     <ReactPlayer
                        className='react-player'
                        url={detail}
                        controls
                     />
                  </div> : ''
               
            } 
         </div>
      )
}
