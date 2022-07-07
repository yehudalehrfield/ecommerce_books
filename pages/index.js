import { ClientError } from '@sanity/client'
import React from 'react'
import {Product, FooterBanner, HeroBanner} from '../components'
import { client } from '../lib/client'

const Home = ({products,bannerData}) => {
  return (
    <>
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