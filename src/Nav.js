import React from 'react';
import PropTypes from 'prop-types'
import MenuIcon from './MenuIcon.js';


class Nav extends React.Component {
  
  static propTypes = {
    
    locationsToShow: PropTypes.array.isRequired,   
    onLocationClick: PropTypes.func.isRequired,
    hideMarkers: PropTypes.func.isRequired
  }; 


  state = {
    
    showPnlBool: false,
    query: '',
    filteredLocations: this.props.locationsToShow
  }


  onClickEv = () => {
    
    let clicked = this.state.showPnlBool;
   
    clicked = clicked ? false : true;    
    this.setState({showPnlBool: clicked})   
  }
  
  
  filterLocations = (query) => { 
     
    const locations = this.props.locationsToShow;
    let filtered;
    
    //console.log("\n\n");
    //console.log("Query is: ", query); 
     
    filtered = locations.filter( (location) => location.title.toLowerCase().startsWith(query.trim()) );     
    
    //console.log("Locations are:  \n", locations);
    //console.log("\nFilter output is: \n", filtered);
    this.props.hideMarkers(filtered);
    this.setState({ query: query.trim() });
    this.setState({ filteredLocations: filtered });      
  }
   

  render() { 
     
    const showPnl = this.state.showPnlBool;    
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
      
        <ul> 
        {
          locations.map((location, index) => (
      
            // This is not accessible -> <li key={index} onClick={(event) => callbackOnClick(event, location)}>{location.title}</li>
            <li key={index} onClick={(event) => callbackOnClick(event, location)}><button>{location.title}</button></li>                  
          ))
        }
        </ul>  
        
        </div>      
      </div>   
    );  
  }  
}


export default Nav;