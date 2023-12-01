import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
    return (
        <>
        <div className='product'>
            <Link to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <b>{product.name}</b>
            {/* <span className='price'>{`Rs. ${product.price}`}</span> */}
            </Link>
            </div>
        </>
    )
}

export default Product