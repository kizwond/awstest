import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <footer>
                <div style={footer_detail}>
                    Copyright © OpenSKY Corp. All Rights Reserved.
                </div>
            </footer>
         );
    }
}
 
export default Footer;

const footer_detail = {
    width:"1440px",
    margin:"auto",
    marginTop:"10px",
    textAlign:"center",
    fontWeight: "400",
    fontSize:"11px",
    fontFamily:`"Noto Sans KR", sans-serif`,
}