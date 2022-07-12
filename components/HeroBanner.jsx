import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'

const HeroBanner = (
  {heroBanner : 
    {discount,largeText1,largeText2,saleTime,smallText,midText, product, buttonText,image,desc}}
  ) => {
  return (
    <div className = "hero-banner-container">
      <div>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <p className='banner-book-title'>{smallText}</p>
        <img src={urlFor(image)} alt = "book" className='hero-banner-image'/>
        <div>
          <Link href={`/product/${product}`}>
            <button type = 'button'>{buttonText}</button>
          </Link>
          <div className = 'desc'>
            {/* <h5>Great Reads</h5> */}
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner