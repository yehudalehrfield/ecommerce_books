import React from 'react'
import { ClientError } from '@sanity/client'
import {Product, FooterBanner, HeroBanner} from '../components'
import { client } from '../lib/client'
import Head from 'next/head' // see comment below

const Home = ({products,bannerData}) => {
  return (
    <>
      {/* maybe get rid of this Head component and use the favicon data in the Layout component instead */}
      <Head>
        <link rel = 'icon' type = 'image/png' sizes = '32x32' href = '/favicon-32x32.png'/>
        <link rel = 'icon' type = 'image/png' sizes = '16x16' href = '/favicon-16x16.png'/>
        <link rel = 'apple-touch-icon' sizes = '180x180' href = '/apple-touch-icon.png'/>
        <link rel = 'manifest' href = '/set.webmanifest'/>
        {/* <link rel = 'mask-icon' href = '/savari-pinned-tab.svg'/> */}
        <meta name = 'theme-color' content = '#ffffff' />

      </Head>
      <HeroBanner heroBanner = {bannerData.length && bannerData[1]}/>
    
      <div className = "products-heading">
        <h2>Best Sellers</h2>
        <p> All different types of books</p>
      </div>

      <div className = "products-container">
        {products?.map(
          (product) => <Product key={product._id} product = {product} />)}
      </div>

      <FooterBanner footerBanner = {bannerData && bannerData[0]}/>
    </>
  )
}

export const getServerSideProps = async () => {
  // get all products from sanity
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  // get all banners
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {products, bannerData}
  }
}
export default Home