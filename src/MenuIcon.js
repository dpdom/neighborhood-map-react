import React from 'react';
import PropTypes from 'prop-types' 

/*
 * Based on: 
 *
 *  https://www.w3schools.com/howto/howto_js_mobile_navbar.asp and
 *  https://www.w3schools.com/howto/howto_css_menu_icon.asp    
 *  https://www.w3.org/TR/2016/WD-wai-aria-practices-1.1-20160317/examples/button/button.html
 *
 */

class MenuIcon extends React.Component {
  
  static propTypes = {
    
    onClickEv: PropTypes.func.isRequired   // Handles the button status    
  };
      
 
  // Handles the user interaction 
  handleUserInteraction (ev) { 
    
    const button = ev.target;   
    let divEl = document.querySelector('.icon-container');  
    
    // The user interacts with the button by clicking a mouse button
    // or by pressing a key (space or enter keys)
    if (ev.key === " " || ev.key === "Enter" || ev.type === "click" ) {
      
      if(!(ev.type === "click")) ev.preventDefault();      
          
      divEl.classList.toggle("change");
      
      // Shows (or hides) the panel
      this.props.onClickEv();    
      
      // Change the aria-pressed attribute on the button
      if(button.getAttribute("aria-pressed") === 'true') button.setAttribute("aria-pressed", false)
      else button.setAttribute("aria-pressed", true)
    }
  }

  
  // By default the outline property is set to 0. Focus is handled
  // through the JavaScript code
  handleFocus (ev) {
    
    const bar1 = document.querySelector(".bar1");
    const bar2 = document.querySelector(".bar2");
    const bar3 = document.querySelector(".bar3");
      
    bar1.classList.toggle("focused");
    bar2.classList.toggle("focused");
    bar3.classList.toggle("focused");        
  }
 

  render() { 
    
    return (
      
     <div role="button" tabIndex="0" aria-pressed="false" className="icon-container" onClick={(event) => this.handleUserInteraction(event)} onKeyPress={(event) => this.handleUserInteraction(event)} 
      onFocus={(event) => this.handleFocus(event)} onBlur={(event) => this.handleFocus(event)}>       
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    );  
  }  
}

export default MenuIcon;