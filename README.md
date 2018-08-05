# Neighborhood Map (React)

This is the final assessment project for Udacity's Front-End Web Developer Nanodegree Program. The 'Neighborhood Map' is a single page application featuring a map of student's neighborhood or a neighborhood the student would like to visit. The map include highlighted locations, third-party data about those locations and various ways to browse the content.

Features and specifications:

- all application components render on-screen in a responsive manner;
- a list-view of location names is provided which displays all locations by default, and displays the filtered subset of locations when a filter is applied;
- map displays all location markers by default, and displays the filtered subset of location markers when a filter is applied;
- map markers identify locations;
- third-party APIs (Flickr's API) provide additional information about each of these locations;
- 'Neighborhood Map' follows this [Project Specification](https://review.udacity.com/#!/rubrics/1351/view).

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Installing

To launch the app in development mode follow these steps:
 
* install [node](https://nodejs.org/it/);
* clone (`git clone [url]`) this repository on a local folder;
* install all project dependencies (`npm install`);
* start the development server (`npm start`);
* edit the conf.json file and insert a valid API key;
* the app will be reachable at the address [http://localhost:3000/](http://localhost:3000/).

![A screenshot of the conf.json file](resources/sh_01.PNG "conf.json")

Note that the service worker will work only in production mode.

## Third-party APIs

The application utilizes the Google Maps API and the [Flickr API](https://www.flickr.com/services/api/) as well. Click on the link for documentation.

## Resources

* [Google Maps JavaScript API V3 Reference](https://developers.google.com/maps/documentation/javascript/reference/3.exp/)
* [Flickr API reference](https://www.flickr.com/services/api/)
* [Create React App](https://github.com/elfiservice/neighborhood-map-react)
* [Google Map React Component](https://github.com/fullstackreact/google-maps-react)
* [Material Design Icons](https://materialdesignicons.com/icon/map-marker)
* [ARIA button role Example](https://www.w3.org/TR/2016/WD-wai-aria-practices-1.1-20160317/examples/button/button.html)

## Screenshot

