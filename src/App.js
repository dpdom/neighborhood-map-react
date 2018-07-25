import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import './App.css';
import Map from './Map.js';

class App extends Component {
  
  render() { 
    
    return (
      <div className="app"> 
        {
          (!this.props.loaded) && (
            <div>
              Error condition!
            </div>                      		
          )
				}  
        { 
          (this.props.loaded) && (            
              <Map google={this.props.google}/>                              		
          )
				}
      </div>    
    );    
  }
}
 

/*
 *  A declarative Google Map React component using React, 
 *  lazy-loading dependencies, current-location finder 
 *  and a test-driven approach by the Fullstack React team.
 *
 *  https://github.com/fullstackreact/google-maps-react
 */
export default GoogleApiWrapper({
  apiKey: require("./conf.json").apiKey
})(App)