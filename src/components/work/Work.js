import React from 'react'
import {BsSearch} from "react-icons/bs"
import {PiHandTapBold} from "react-icons/pi"
import {MdDirectionsBike} from "react-icons/md"
import "./Work.css"

const Work = () => {

  return (
    <div className="work">
        <h1>How it Work?</h1>
        <div className="workContainer">
            <div className="workContainerItems">
                <BsSearch className='workIcons'/>
                <b>Find the right Bike</b>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim, quidem.</p>
            </div>
            <div className="workContainerItems">
                <PiHandTapBold className='workIcons' />
                <b>Book it Online</b>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim, quidem.</p>
            </div>
            <div className="workContainerItems">
                <MdDirectionsBike className='workIcons'/>
                <b>Enjoy your ride</b>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim, quidem.</p>
            </div>
        </div>
    </div>
  )
}

export default Work