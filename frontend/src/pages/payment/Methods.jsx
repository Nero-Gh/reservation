import React from 'react'
import "./methods.css"
import card_img from '../../assets/card_img.png'
import mobile_img from '../../assets/mobile_money.png'

const Methods = () => {
  return (
    <div className='methods'>
         <div class="col-1">
                <h3 class="title">payment</h3>
                <div class="inputBox">
                    <span>accepted:</span>
                    <img src={mobile_img} />
                </div>
        </div>
         <div class="col-2">
                <h3 class="title">Coming Soon😉</h3>
                <div class="inputBox">
                    <img src={card_img}/>
                </div>
        </div>
    </div>
  )
}

export default Methods