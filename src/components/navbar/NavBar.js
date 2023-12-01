import React,{useState} from 'react'
import "./NavBar.css"
import {AiOutlineShoppingCart,AiOutlineSearch} from "react-icons/ai"
import {RxHamburgerMenu} from "react-icons/rx"
import {RxAvatar} from "react-icons/rx"
import {Link} from "react-router-dom"
import {AiOutlineClose} from "react-icons/ai"
import { Sidebar } from "../../sideBar"

const NavBar = () => {
  const [sidebar,setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)
  return (
    <>
    <div className='navContainer'>
        <div className="leftSide">
          <RxHamburgerMenu className='hamburgerIcons' onClick={showSidebar}/>
            <h2>Bike<span>Buddy</span></h2>
        </div>
        {/* <div className="midSide">
          <input type="text" placeholder='search your product here' />
          <AiOutlineSearch className='searchIcons'/>
        </div> */}
        <div className="rightSide">
            <AiOutlineShoppingCart className='navIcons'/>
            <Link to="/login">
            <RxAvatar className='navIcons'/>
            </Link>
        </div>
    </div>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                  <AiOutlineClose />
              </li>
              {Sidebar.map((item,i)=> { 
                return(
                  <li key={i} className={item.className}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
        </nav>
   </>
  )
}

export default NavBar