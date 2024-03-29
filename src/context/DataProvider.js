'use client'

import { getBannerData } from '@/sanity/actions/banner.images.actions'
import { getAllProducts } from '@/sanity/actions/products.actions'
import React, { useState, useEffect } from 'react'
import { createContext } from 'react'

const DataContext = createContext()

const DataProvider = ({ children }) => {

  // products data
  const [products, setProducts] = useState([])
  useEffect(()=>{
    ;(async()=>{
      const products = await getAllProducts()
      setProducts(products)
    })()
  }, [])

  // banner data
  const [bannerData, setBannerData] = useState([])
  useEffect(()=>{
    ;(async()=>{
      const bannerData = await getBannerData()
      setBannerData(bannerData)
    })()
  }, [])
  
  // cart data
  const iniCartData = () => {
    let localCartData = null
    if (typeof window !== 'undefined') {
      localCartData = JSON.parse(localStorage.getItem('cartData'))
    }
    return localCartData || []
  }
  const [cartData, setCartData] = useState(iniCartData())

  return (
    <DataContext.Provider
      value={{
        products,
        bannerData,
        cartData,
        setCartData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export { DataProvider, DataContext }
