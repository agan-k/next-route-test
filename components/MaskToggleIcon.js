import React from 'react'
import { useState } from 'react'



export default function MaskToggleIcon() {

   const [maskedImages, setMaskedImages] = useState(true)
   
   return (
      <div className="wrapper" >
         {!maskedImages ? 
            <div className="container masked" onClick={() => setMaskedImages(!maskedImages)}>
               <div className="square">
                  <div className="rectangle square"></div>
               </div>
               <div className="square">
                  <div className="rectangle square"></div>
               </div>
               <div className="square">
                  <div className="rectangle square"></div>
               </div>
               <div className="square">
                  <div className="rectangle square"></div>
               </div>
               <div className="square">
                  <div className="rectangle square"></div>
               </div>
               <div className="square">
                  <div className="rectangle square"></div>
               </div>
            </div> :
            
            <div className="container unmasked" onClick={() => setMaskedImages(!maskedImages)}>
               <div className="square">
                  <div className="rectangle horizontal"></div>
               </div>
               <div className="square">
                  <div className="rectangle vertical"></div>
               </div>
               <div className="square">
                  <div className="rectangle horizontal"></div>
               </div>
               <div className="square">
                  <div className="rectangle vertical"></div>
               </div>
               <div className="square">
                  <div className="rectangle horizontal"></div>
               </div>
               <div className="square">
                  <div className="rectangle vertical"></div>
               </div>
            </div>
            }
            
            <style jsx>{`
               .wrapper {
                  width: 80%;
                  margin: 0 auto;
                  display: flex;
                  justify-content: space-between;
               }
               .container {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                  align-items: center;
                  width: 3rem;
                  height: 2rem;
                  border: 1px solid rgb(200, 200, 200);
                  cursor: pointer;
               }
               .square {
                  height: 40%;
                  width: 30%;
               }
               .rectangle {
                  border: 1px solid rgb(233, 233, 233);
               }
               .rectangle.vertical {
                  height: 90%;
                  width: 60%;
                  margin: 2% auto
               }
               .rectangle.horizontal {
                  height: 60%;
                  width: 90%;
                  margin: 20% auto;
               }
               .rectangle.square {
                  height: 100%;
                  width: 100%;
               }
            `}</style>
         </div>
   )
}

