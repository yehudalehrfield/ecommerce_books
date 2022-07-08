import React from 'react'
import {useState} from 'react'
import {client, urlFor} from '../../lib/client'
import {AiFillStar,AiOutlineStar,AiOutlineMinus,AiOutlinePlus} from 'react-icons/ai'
import { Product } from '../../components';

const ProductDetails = ({product,products}) => {
  //destructure for ease of access to fields
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img src={urlFor(image && image[index])}
            className = 'product-detail-image'/>
          </div>
          <div className='small-images-container'>
            {image?.map((item, i) => (
              <img src = {urlFor(item)}
              className = {i ===index ? 'small-image selected-image' : 'small-image'}
              onMouseEnter={() => setIndex(i)}/>
            ))}
          </div>
        </div>
        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiOutlineStar/>
            </div>
            <p>(20)</p>
          </div> 
          <h4>Details: </h4>
          <p> {details}</p>
          <p className='price'> ${price}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span className = 'minus' onCick = ''><AiOutlineMinus/></span>
              <span className = 'num' onCick = ''>0</span>
              <span className = 'plus' onCick = ''><AiOutlinePlus/></span>
            </p>
          </div>
          <div className='buttons'>
            <button type = 'button' className='add-to-cart' onClick = ''>Add To car</button>
            <button type = 'button' className='buy-now' onClick=''>Buy Now</button>
          </div>
        </div>
      </div>
      <div className = 'maylike-products-wrapper'>
        <h2>You may also like: </h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((item) => (
              <Product key = {item._id}
              product = {item} />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  //get all products, we only need the slug for each product (not all data)
  const query = `*[_type == 'product'] 
    {slug {
      current
    }
  }`;
  //fetch all products with above query
  const products = await client.fetch(query);
  //generate paths for each product, return an object with a slug for each
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));
  return {
    paths, fallback:'blocking'
  };
}

export const getStaticProps = async ({params: {slug}}) => {
  //get product which matches our current slug/url (this product)
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  //get similar prodcuts
  const productsQuery = '*[_type == "product"]';
  
  //fetch individual product
  const product = await client.fetch(query);
  //fetch other products
  const products = await client.fetch(productsQuery);

  return {
    props: {products, product}
  }
}

export default ProductDetails