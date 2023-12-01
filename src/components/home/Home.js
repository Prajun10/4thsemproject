import React,{useEffect} from 'react'
import bike from "../../../src/img/bikepng.png"
import Product from './Product'
import Work from '../work/Work'
import { fetchProducts } from '../../store/productSlice'
import {useSelector,useDispatch} from "react-redux"
import "./Home.css"

// const product = {
//     name:"pulsar 220",
//     images:[{url:"https://cdn.globalbajaj.com/-/media/Nepal/Images/Pulsar/Product/Pulsar-220F/2021/Pulsar-220F-ABS-New-Black-Nepal.png?h=997&iar=0&w=1640&rev=79efbbbbfc6349fb9125d79f5bf74927&hash=A202E722E5D49892B5C38565D7BD7382"}],
//     price:"5000",
//     _id:"1"
// }
const Home = () => {
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.products)
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  return (
    <>
      <div className='homeContainer'>
        <img src={bike} alt="pic" />
      </div>
      <div className='productHeading'>Featured <span>Bikes</span></div>
      <div className="products">
        {Array.isArray(products.products) && products.products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  )
}

export default Home