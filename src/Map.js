import React from 'react';
import Nav from './Nav.js'
import redIcon from './assets/map-marker-red.png'
import greenIcon from './assets/map-marker-green.png'
import logo from './assets/flickr-logo.jpg'


// Makers' icons: https://materialdesignicons.com/icon/map-marker

class Map extends React.Component {
  
  state = {
    
    map: {}, 
    locations: require("./data/locations.json"),   // Loads locations from 'locations.json'
    infoWindow: {}  
  };

 
  componentDidMount() {
    
    //console.log("Debug #componentDidMount()");    
    this.loadMap();    
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
        icon: redIcon,
        map: map,
        animation: window.google.maps.Animation.DROP     
      });
      
      // The 'click' event to open the info window
      marker.addListener('click', function () { 
        
        let content = this.infoWindowContent(locations[i]);   
        
        // Changes the center of the map to the given position
        map.panTo(marker.getPosition()); 
        
        this.openInfoWindow(marker, content);
      }.bind(this));      
      
      marker.addListener('mouseover', function() {
         
        marker.setIcon(greenIcon);
      })
      
      marker.addListener('mouseout', function() {
         
        marker.setIcon(redIcon);
      })
      
      // Extends the bundaries of the map
      bounds.extend(position);      
      
      locations[i].linkedMarker = marker;
         
      // Adds the new marker to the markers array
      markers.push(marker);        
    }
    
    // Sets the viewport to contain the markers
    map.fitBounds(bounds);    
  }
 

  loadMap() {    
        
    if(this.props && this.props.google) {  
      
      const mapDOMel = document.getElementById('map');
          
      const map = new window.google.maps.Map(mapDOMel, {
        center: {lat: 38.169923, lng: 15.204035},
        zoom: 12,
        mapTypeControl: false,        
        fullscreenControl: true,
        
        // https://developers.google.com/maps/documentation/javascript/controls
        fullscreenControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_BOTTOM
        }
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
    
    // Retrieving data from Flickr
    this.fetchData();    
  }


  // Populates the info window
  infoWindowContent (location) {
  
    let title = location.title;         
    let imgArr = [];    
    let instructions = "Click on the image to visit the author's profile on flickr!";
    let imgHTML = '';    
    
    if(location.flickrData) imgArr = location.flickrData.photos.photo;
    
    for (let image of imgArr) {
       
      imgHTML += `<a class="info-window-author" href=${image.phProfileURL} target="_blank">
                    <img class="info-window-img" alt="A picture of ${title}" src=${image.imageURL} /> 
                  </a>`;       
    }    
    
    if(imgArr.length === 0) {
      
      imgHTML += `<p>No images available :-(</p>`;
      instructions = '';
    }
     
    let content = `

      <div class="info-window">
        <h3 class="info-window-title">${title}</h3>   
        <p>${instructions}</p>
        <div class="info-window-flickr">
          ${imgHTML} 
        </div>      
        <a href="https://www.flickr.com/" target="_blank">
          <img class="info-window-flickr-logo" alt="Flickr logo" src="${logo}"</img>
        </a>
      </div>`;
    
    return content;
  }


  // Opens the info window
  openInfoWindow (marker, content) {
    
    const map = this.state.map;
    const iWindow = this.state.infoWindow;
    
    // iWindow.marker = marker;
    iWindow.setContent(content);
    
    // Opens the info window on the 'marker'
    this.state.infoWindow.open(map, marker);
  }


  /* 
  *  Fetchs data from flickr through flickr's API - https://www.flickr.com/services/api/flickr.photos.search.html
  *  Return a list of photos matching some criteria. Only photos visible to the calling user
  *  will be returned. To return private or semi-private photos, the caller must be authenticated 
  *  with 'read' permissions, and have permission to view the photos. Unauthenticated calls will only 
  *  return public photos.
  */
  
  fetchData = () => {
    
    const locations = this.state.locations;    
    
    for (let location of locations) {
      
      let queryOptions = {
      
        method: 'flickr.photos.search',
        api_key: require("./conf.json").apikey_flickr,   // API application key 
        sort: 'relevance',   // The order in which to sort returned photos 
        text: location.searchFriendly,   // A free text search. Photos who's title, description or tags contain the text will be returned 
        per_page: 5,   // Number of photos to return per page
        format: 'json', 
        lat: location.latitude,
        lon: location.longitude,
        nojsoncallback: 1   // The flickr's API responds with standard JSON       
      }
      
      // Defines utility methods to work with the query string of a URL
      var query = new URLSearchParams(queryOptions);
      
      fetch('https://api.flickr.com/services/rest/?' + query)
        .then(function(response) {
        return response.json();
      })
      .then(function(respJson) {
        
        respJson.title = location.title;      
        
        // Creates URLs in a 'plain' format
        this.writeFlickrURL(respJson.photos.photo);             
 
        location.flickrData = respJson;
      }.bind(this))     
      
      .catch( function(error) {
        console.log("Cannot retreive data: ", error);
      });
    }
  } 
  
  
  // Constructs the source URL to a photo by its ID, server ID, etc..
  // and URLs to profiles as well
  writeFlickrURL = (phArray) => {     
    
    if (phArray.length > 0) {
      
      for (let pic of phArray) {
        
        // Constructs the source URL to the photo
        pic.imageURL = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
        
        // URL to the author's profile on flickr
        pic.phProfileURL = `https://www.flickr.com/people/${pic.owner}/`;        
      }      
    }    
  }
  

  // Passed down to the 'Nav' component. Executed
  // when the user clicks on a location in the menu
  onClickPanTo = (ev, location) => {
 
    let map = this.state.map;
    
    // Changes the center of the map to the given LatLng
    map.panTo(location.linkedMarker.getPosition());
   
    this.openInfoWindow(location.linkedMarker, this.infoWindowContent(location));
  } 
  
  
  hideMarkers = (filteredLocations) => {
    
    const locations = this.state.locations;
    
    // Closing currently showed info window    
    this.state.infoWindow.close();
    
    // Hides all of the markers but doesn't delete them    
    for (let location of locations) location.linkedMarker.setMap(null);
    
    // Shows only locations filtered by the user
    for (let location of filteredLocations) location.linkedMarker.setMap(this.state.map);         
  }   
 
  
  render() { 
     
    return (
      <div>
      <Nav locationsToShow={this.state.locations} onLocationClick={this.onClickPanTo} hideMarkers={this.hideMarkers}/>
      <div id='map' >
        <p className="loading-message">Loading the map...</p> 
      </div>
      </div>
    )
  }
}

export default Map;