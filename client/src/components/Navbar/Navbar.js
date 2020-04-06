import React from 'react'

import Logo from '../../assets/logo.jpg'

// import {Link} from 'react-router-dom'


const Navbar = () => {
    return (
        <div style={{height:'8vh',width:'100%',display:'flex',alignItems:'center',background:'white'}}>


<img src={Logo} alt="logo" style={{width:'2rem',display:'inline',position:'relative',bottom:5,cursor:'pointer'}} />

{/* <Link to="/" style={{textDecoration: 'none'}}> */}

            <h6 style={{fontWeight:'bold',cursor:'pointer',marginBottom:'1vh'}} >
                    <p style={{display:'inline',color:'#EA0F58'}}>
                    Care
                    </p>
                   
                    <p style={{display:'inline',color:'#8C727B'}}>
                    Medico
                    </p>
            </h6>

{/* </Link> */}



<div style={{position:'absolute',right:'2rem',display:'flex',alignItems:'end',justifyContent:'space-between'}}>
{/* 
<Link to="/dashboard" style={{textDecoration:'none'}}>

<h6 style={{color:'#8C727B',fontSize:'0.7rem',cursor:'pointer'}}>
Dashboard
</h6>


</Link> */}

</div>
            
            
        </div>
    )
}

export default Navbar
