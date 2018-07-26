import React from 'react';
import Nav from './Nav.js'

class Map extends React.Component {
  
  state = {
    
    map: {},
    locations: require("./data/locations.json"), // Loads locations from 'locations.json'
    mapMarkers: [],
    infoWindow: {}  
  };

 
  componentDidMount() {
    
    console.log("Debug #componentDidMount()");    
    this.loadMap();    
  }
  
   
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.infoWindow !== this.props.infoWIndow) console.log("Just a test - componentDidUpdate #1");
    
    if (prevProps.google !== this.props.google) {
      //this.loadMap();
      console.log("Just a test - componentDidUpdate");
    }
  } 


  placeMarkers(map) {
    
    const locations = this.state.locations;
    
    // Boundaries of the map
    var bounds = new window.google.maps.LatLngBounds();
    
    // The markers array
    let markers = [];
    
    // Creates a marker for each location
    for(let i=0; i < locations.length; i++) {
   
      let position = {"lat": locations[i].latitude, "lng": locations[i].longitude};
      let title = locations[i].title;
      
      let marker = new window.google.maps.Marker({
        
        position: position,
        title: title,
        map: map,
        animation: window.google.maps.Animation.DROP     
      });
      
      // The 'click' event to open the info window
      marker.addListener('click', function () { 
        
        let content = `

          <div class="info-window">
            <p class = info-window-title>${title}</p>          
          </div>`;
        
        this.writeInfoWindow(marker, content);
      }.bind(this));      
      
      marker.addListener('mouseover', function() {
        
        //TODO
      })
      
      // Extends the bundaries of the map
      bounds.extend(position);      
      
      // Adds the new marker to the markers array
      markers.push(marker);        
    }
    
    // Sets the viewport to contain the markers
    map.fitBounds(bounds);
    
    // Updates the component's state
    this.setState({mapMarkers: markers});   
  }
  

  loadMap() {    
        
    if(this.props && this.props.google) {  
      
      const mapDOMel = document.getElementById('map');
          
      const map = new window.google.maps.Map(mapDOMel, {
        center: {lat: 38.169923, lng: 15.204035},
        zoom: 12,
        mapTypeControl: true        
      })    
      
     /*  Creates a new info window (displays text or images 
      *  in a popup window above the map). 
      *  #1 Info windows are always anchored to a marker
      *  #2 Only one info window is displayed at a time
      */
      const infoWindow = new window.google.maps.InfoWindow();     
      this.placeMarkers(map); 
      this.setState({map: map, infoWindow: infoWindow});        
    }
  }


  // Populates the info window
  writeInfoWindow (marker, content) {
    
    const map = this.state.map;
    const iWindow = this.state.infoWindow;
    
    iWindow.maker = marker;
    iWindow.setContent(content);
    
    // Opens the info window on the 'marker'
    this.state.infoWindow.open(map, marker);
  }

  
  render() { 
    
    return (
      <div>
      <Nav/>
      <div id='map' >
        Loading map...
      </div>
      </div>
    )
  }
}


export default Map;