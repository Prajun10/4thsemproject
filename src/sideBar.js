import React from 'react'
import {AiFillHome} from "react-icons/ai"
import {MdOutlineMan4} from "react-icons/md"
import {BsCartFill} from "react-icons/bs"
import {VscFeedback} from "react-icons/vsc"
import {AiOutlineSearch} from "react-icons/ai"

export const Sidebar = [
    {
        title:"Home",
        path:"/",
        icon:<AiFillHome/>,
        className:"nav-text"
    },
    {
        title:"About",
        path:"/about",
        icon:<MdOutlineMan4/>,
        className:"nav-text"
    },
    {
        title:"Products",
        path:"/products",
        icon:<BsCartFill/>,
        className:"nav-text"
    },
    {
        title:"Feedback",
        path:"/feedback",
        icon:<VscFeedback/>,
        className:"nav-text"
    },
    {
        title:"Search",
        path:"/search",
        icon:<AiOutlineSearch/>,
        className:"nav-text"
    }

]