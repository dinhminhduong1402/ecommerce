'use client'

import React, { useContext, useEffect, useState } from 'react'
import {ProductsSlider, ProductCard} from '../components'
import { DataContext } from '@/context/DataProvider'

const BestSellerProduct = () => {
  const {products} = useContext(DataContext)
  const bsProducts = products
  return (
    <section className="best-seller-products">
      <div className="best-seller-products-container">

        <div className="section-title">
          <h2>Best seller products</h2>
          <span>View all products</span>
        </div>

        <div className="products-slider">
          <ProductsSlider>
            {bsProducts.map((prod, ind) => (
              <ProductCard
                key={ind}
                productThumb={prod.thumbs && prod.thumbs[0]}
                productName={prod.name}
                productCatogory={prod.catogory}
                productPrice={prod.price}
                productPrevPrice={prod.prev_price}
                productSlug={prod.slug.current}
              />
            ))}
          </ProductsSlider>
        </div>
      </div>
    </section>
  )
}

export default BestSellerProduct
