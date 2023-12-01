import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../../store/productSlice'
import { useSelector, useDispatch } from "react-redux"
import { useParams } from 'react-router-dom'
import Product from '../home/Product'
import "./Products.css"

const Products = () => {
    const dispatch = useDispatch()

    const {keyword} = useParams()
    const { products,resultPerPage } = useSelector((state) => state.products)
    console.log(resultPerPage)
    useEffect(() => {
        dispatch(fetchProducts(keyword))
    }, [dispatch,keyword])
    return (
        <>
            <h2 className='productHeading'>Bike Rentals</h2>
            <div className='products'>
                {Array.isArray(products.products) && products.products.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
            </div>
         
        </>
    )
}

export default Products