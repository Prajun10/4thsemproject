import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { fetchProducts } from '../../store/productSlice'
import "./Search.css"

const Search = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [keyword, setKeyword] = useState("")
    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/products/${keyword}`)
            // console.log("Keyword after navigation:", keyword);
            dispatch(fetchProducts(keyword))
        } else {
            navigate("/products")
        }
    }
    return (
        <>
            <form className='searchBox' onSubmit={submitHandler}>
                <input type='text' placeholder='search' onChange={(e) => setKeyword(e.target.value)} />
                <input type='submit' value="search" />
            </form>
        </>
    )
}

export default Search