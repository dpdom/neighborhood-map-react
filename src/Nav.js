import React from 'react';
import PropTypes from 'prop-types'
import MenuIcon from './MenuIcon.js';


class Nav extends React.Component {
  
  static propTypes = {
    
    locationsToShow: PropTypes.array.isRequired,   
    onLocationClick: PropTypes.func.isRequired,   // Changes the center of the map, opens the info window  
    hideMarkers: PropTypes.func.isRequired   // Hides filtered locations
  }; 


  state = {
    
    showPnlBool: false,
    query: '',
    filteredLocations: this.props.locationsToShow
  }


  // Handles the button status 
  onClickEv = () => {
    
    let clicked = this.state.showPnlBool;
   
    clicked = clicked ? false : true;    
    this.setState({showPnlBool: clicked})   
  }
  
  
  // Filters locations according to the 
  // user input 
  filterLocations = (query) => { 
     
    const locations = this.props.locationsToShow;
    let filtered;    
     
    filtered = locations.filter( (location) => location.title.toLowerCase().startsWith(query.trim()) );         
    
    this.props.hideMarkers(filtered);   // Hides markers accordingly
    this.setState({ query: query.trim() });   // Updates the query
    this.setState({ filteredLocations: filtered });   // Updates the component state      
  }
   

  render() { 
     
    const showPnl = this.state.showPnlBool;   // True: panel is showed
    const locations = this.state.filteredLocations; 
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
        
        {/* Input field for locations filtering */}
        <input type="text" className="sidebar-items-search-input" placeholder="Search Location" value={this.state.query} onChange={(event) => this.filterLocations(event.target.value)}/>
      
        <ul role="list"> 
        {
          locations.map((location, index) => (      
             
            /* List-view of location names */ 
            <li role="listitem" key={index} onClick={(event) => callbackOnClick(event, location)}><button role="button">{location.title}</button></li>                  
          ))
        }
        </ul>  
        
        </div>      
      </div>   
    );  
  }  
}

export default Nav;