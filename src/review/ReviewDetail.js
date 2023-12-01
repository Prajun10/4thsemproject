import React from 'react'
import "./ReviewDetail.css"
import profilePng from "../img/profile-icon-png-898.png"
const ReviewDetail = ({review}) => {
  return (
    <div className='reviewCard'>
        <img src={profilePng} alt="profile" />
        <p className='reviewerName'>{review.name}</p>
        <p className='reviewComment'>{review.comment}</p>
    </div>
  )
}

export default ReviewDetail