 import React from 'react'
import { Header } from '../common/Header'
import PropTypes from "prop-types";
import { Footer } from './Footer';

 
 const Layout = ({children}) => {
   return (
       <div>
           <Header />
           <main style={{ minHeight:'80vh'}}>{children}</main>
           <Footer />
     </div>
   )
}

export { Layout }
 
Layout.propTypes = {
  children: PropTypes.isRequired,
};