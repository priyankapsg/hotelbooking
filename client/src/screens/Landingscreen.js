import React from 'react'
import {Link} from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
  duration:2000
});

const Landingscreen = () => {
  return (
    <div className='row landing'>
        <div className="col-md-12 text-center">
        <h2 data-aos='zoom-in' style={{color:'white',fontSize:'100px'}}>PANDA BOOKINGS</h2>
        <h1 data-aos='zoom-out' style={{color:'white'}}>"There is only one boss.The Guest!"</h1>
        <div style={{ margin: '40px 0' }}>
        <h2 data-aos='zoom-out' style={{color:'white', fontFamily:'sans-serif', fontSize:'30px'}}>"Exclusive Limited-Time Offer! 🌟 Book Your Stay Now and Save Big!"</h2>
        </div>
        <div style={{ margin: '110px 0' }}>
        <Link to='/home'>
            <button className='btn landingbtn' style={{color:'black'}}>Get Started</button>
        </Link>
        
       
        </div>
        </div>
    </div>
  )
}

export default Landingscreen