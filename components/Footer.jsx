import React from 'react'
import { AiFillInstagram, AiFillTwitterSquare, AiFillYoutube, AiFillFacebook, AiOutlineTwitter, AiOutlineInstagram, AiOutlineYoutube, AiOutlineFacebook } from 'react-icons/ai'
const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 - Books For Bucks - All Rights Reserved</p>
      <p className='icons'>
        <AiFillInstagram/>
        {/* <AiOutlineInstagram/> */}
        <AiOutlineTwitter/>
        <AiFillYoutube/>
        {/* <AiOutlineYoutube/> */}
      </p>
    </div>
  )
}

export default Footer