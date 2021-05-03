import React from 'react'
import Header from '../Headers/Headers'
import MenuHeader from '../MenuHeader/MenuHeader'

/**
* @author
* @function Layout
**/

const Layout = (props) => {
  return(
    <>
        <Header />
        <MenuHeader />
        {props.children}
    </>
   )
  }


export default Layout