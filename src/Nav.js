import React from 'react';
import PropTypes from 'prop-types'
import MenuIcon from './MenuIcon.js';


class Nav extends React.Component {
  
  static propTypes = {
    
    locationsToShow: PropTypes.array.isRequired,   
    onLocationClick: PropTypes.func.isRequired
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
    const callbackOnClick = this.props.onLocationClick;
    let className = '';
    let classNameTitle = 'sidebar-title';
    let classNameContainer = 'sidebar-container';
    
    if (showPnl) className = 'sidebar-items-container'; 
    else className = 'sidebar-items-container hide';     
 
    return (
      
      <div className={classNameContainer}>
        <h1 className={classNameTitle}>Locations</h1>
        <MenuIcon onClickEv={this.onClickEv}/>
      
        <div className={className}>
      
        <ul> 
        {
          locations.map((location, index) => (
            <li key={index} onClick={(event) => callbackOnClick(event, location)}>{location.title}</li>
          ))
        }
        </ul>  
        
        </div>      
      </div>   
    );  
  }  
}


export default Nav;