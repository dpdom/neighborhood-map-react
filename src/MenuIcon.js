import React from 'react';
import PropTypes from 'prop-types' 


class MenuIcon extends React.Component {
  
  static propTypes = {
    
    onClickEv: PropTypes.func.isRequired    
  };
    
  handleClick () {
     
    let divEl = document.querySelector('.icon-container');      
    divEl.classList.toggle("change");
    this.props.onClickEv();
  }  
  
  render() { 
    
    return (
      
      <div className="icon-container" onClick={this.handleClick.bind(this)}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    );  
  }  
}

export default MenuIcon;