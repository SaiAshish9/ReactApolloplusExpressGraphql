import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

import Footer from '../../components/Footer/Footer'


const Wrapper = ({children}) => {
    return (
<React.Fragment style={{overflowX: 'hidden'}}>

    <Navbar/>
    {children}
    <Footer/>
    </React.Fragment>

    )
}

export default Wrapper
