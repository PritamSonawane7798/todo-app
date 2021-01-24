import React, { Component } from 'react';
import './footer-style.css';
class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <a className="footer-name1">Author: <span className="footer-span">Pritam Sonawane</span></a><br></br>
                <a className="footer-name2">Software Developer</a>
                
            </div>
        );
    }
}

export default Footer;