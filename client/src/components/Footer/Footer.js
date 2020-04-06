import React from 'react';

import {FaFacebookF,FaTwitter,FaInstagram} from 'react-icons/fa'

const Footer=()=>{

return (

    <div style={{ display:'flex',flexDirection:'column',alignItems:'center' ,justfiContent:'center', height:'20vh',background:'black',width:'100%',textAlign:'center'}}>

<div style={{marginTop:'2vh',padding:10}}>

<a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" >
<FaFacebookF color="white" size={15} style={{margin:5}} />
</a>

<a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" >
<FaTwitter color="white" size={15} style={{margin:5}}/>
</a>

<a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" >
<FaInstagram color="white" size={15} style={{margin:5}}/>
</a>
</div>


<p style={{marginTop:'2vh', color:'white',fontWeight:'bold',textAlign:'center'}}>
Copyright © CareMedico 2020 All Rights Reserved
</p>

    </div>

)

}

export default Footer