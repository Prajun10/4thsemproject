import React, { useEffect } from 'react'
import "./ProductDetails.css"
import { fetchProductsDetails } from "../store/productDetailSlice"
import ReviewDetail from '../review/ReviewDetail'
import { useSelector, useDispatch } from "react-redux"
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
    const dispatch = useDispatch()
    const { product } = useSelector((state) => state.product)
    const { id } = useParams()
    useEffect(() => {
        dispatch(fetchProductsDetails(id))
    }, [dispatch, id])
    const imageUrl = product?.product?.images[0]?.url;
    const {stocks,description,numOfReviews,name,reviews} = product?.product ?? {}
    
    return (
        <>
            <div className='mainContainer'>
            <div className='productDetailImg'>
                {imageUrl && <img src={imageUrl} alt="Product" />}
            </div>
            <div className="productDetails">
                <div className='section1'>
                    <h2>{name}</h2>
                    <p>Product #{id}</p>
                </div>
                <div className="section2">
                    <span>({numOfReviews})Reviews</span>
                </div>
                <div className="section3">
                    <button>-</button>
                    <input value="1" type='number' />
                    <button>+</button>
                    <button className='cartButton'>Add to Cart</button>
                </div>
               
                
                <div className="section4">
                    <p>status :{""}
                        <b className={stocks < 1 ? "redColor" : "greenColor"}>{stocks < 1 ? "OutOfStock" : "InStock"}</b>
                    </p>
                </div>
                <div className="section5">
                            <p>Description : <br/><span>{description}</span></p>
                </div>
                <button className='submitReview'>Submit Review</button>
            </div>
            </div>
            <div className="reviews">
                <h3 className='reviewHeading'>Reviews</h3>
                {reviews && reviews[0] ? (
                    <div className="reviewsContainer">
                        {reviews.map((review) => (
                            <ReviewDetail review={review} />
                        ))}
                    </div>
                ) : (
                    <p className='noReviews'>No reviews yet 😒</p>
                )}
            </div>
            </>
    )
}

export default ProductDetails