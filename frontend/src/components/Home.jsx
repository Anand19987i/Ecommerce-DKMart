import React from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import HeroSection from './HeroSection'
import ProductSelection from '../product/ProductSelection'
import BeveragesProduct from '../product/BeveragesProduct'
import FoodProducts from '../product/FoodProducts'
import HomeCareProducts from '../product/HomeCareProducts'
import CustomerCare from './CustomerCare'
import Footer from './Footer'
import ContactCare from './ContactCare'

const Home = () => {
  const { user } = useSelector(store => store.auth)
  
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <ProductSelection />
      <BeveragesProduct />
      <FoodProducts />
      <HomeCareProducts />
      <CustomerCare />
      <ContactCare/>
      <Footer />
    </div>
  )
}

export default Home
