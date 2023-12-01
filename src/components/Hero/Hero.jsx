import React from 'react'
import './Hero.css'
import hand_icon from '../assets/hand_icon.png'
import arrow_icon from '../assets/arrow.png'
import hero_img from '../assets/hero_image.png'
const Hero = () => {
    return (
        <div className='hero'>
            <div className="hero-left">
                <h2>New arrivals only</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>new</p>
                        <img src={hand_icon} alt="hero-hand-icon" />
                    </div>
                    <p>collections</p>
                    <p>for everyone</p>
                </div>
                <div className="hero-latest-btn">
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="Arrow icon" />
                </div>
            </div>

            <div className="hero-right">
                <img src={hero_img} alt="" />
            </div>
        </div>
    )
}

export default Hero
