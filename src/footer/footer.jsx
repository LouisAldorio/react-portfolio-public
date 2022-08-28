import React from 'react'
import './footer.css'

function Footer(){

    let currentYear = new Date().getFullYear()
    return (
        <div className="footer">Designed And Developed By Louis Aldorio &copy; {currentYear} </div>
    );
}

export default Footer;