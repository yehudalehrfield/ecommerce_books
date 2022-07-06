import React from 'react'

const Home = () => {
  return (
    <>
      Hero Banner
    
      <div>
        <h2>Best Selling Products</h2>
        <p> All different types of books</p>
      </div>
      <div>
        {['Product 1', 'Product 2'].map(
          (product) => product
        )}
      </div>

      Footer
    </>
  )
}

export default index