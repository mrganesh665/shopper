import React from 'react'
import './NewsLetter.css'
import toast from 'react-hot-toast'
const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
        <input type="email" placeholder='Your Email id'/>
        <button onClick={()=>{
          toast.success("Email Subscribed")
        }}>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetter