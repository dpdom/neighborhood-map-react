import React from 'react';
import PropTypes from 'prop-types' 


class MenuIcon extends React.Component {
    
  changeClass () {
    
    let divEl = document.querySelector('.icon-container');      
    divEl.classList.toggle("change");
  }  
  
  render() { 
    
    return (
      
      <div className="icon-container" onClick={this.changeClass}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    );  
  }  
}

export default MenuIcon;