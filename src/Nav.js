import React from 'react';
import PropTypes from 'prop-types'
import MenuIcon from './MenuIcon.js';

/* <a href="javascript:void(0);" className="icon" onClick={this.showNav}>            
            <i className="fa fa-bars"></i>
          </a>*/
class Nav extends React.Component {
  
  static propTypes = {
    
    locationsToShow: PropTypes.array.isRequired    
  }; 

  state = {
    
    showPnlBool: false
  }

  onClickEv = () => {
    
    let clicked = this.state.showPnlBool;
   
    clicked = clicked ? false : true;    
    this.setState({showPnlBool: clicked})   
  }
   

  render() { 
    
    const showPnl = this.state.showPnlBool;    
    const locations = this.props.locationsToShow;
    let className = '';
    
    if (showPnl) className = 'sidebar-items-container';
    else className = 'sidebar-items-container hide';
    
    return (
      
      <div className="sidebar-container">
        <h1 className="sidebar-title">Locations</h1>
        <MenuIcon onClickEv={this.onClickEv}/>
      
        <div className={className}>
          <ul>
            <li>#Item</li>
            <li>#Item2</li>
          </ul>
        
        </div>        
      
      </div>   
    );  
  }  
}


export default Nav;