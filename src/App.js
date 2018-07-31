import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js';
import Filter from './components/Filter.js';
import Map from './components/Map.js';
import placesInfo from './places.json'
import escapeRegExp from 'escape-string-regexp';

class App extends Component {

  state = {
    places: [],
    showedPlaces: [],
    query: '',
    toggle: '',
    markerId: false

  }

// Handling errors on Google Maps
  componentDidMount() {
     window.gm_authFailure = this.gm_authFailure;
     this.setState({
       places: placesInfo,
       showedPlaces: placesInfo,
       mapLoaded: true
     });
   }

  gm_authFailure = () => {
    window.alert("Google maps authentication error");
  }

  //Filter function to use when writing on the search box
  filterPlaces = (query) => {
    const { places } = this.state;
    let showedPlaces;

    this.setState({
      query: query
    });

  // filter places to show based on query
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showedPlaces = places.filter(place => match.test(place.name));
    } else {
      showedPlaces = places;
    }

    this.setState({ showedPlaces });
  }

  onMarkerClick = (id, toggle) => {
    this.setState({
      markerId: id,
      toggle
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main>

          <Filter
              states={this.state}
              filterPlaces={this.filterPlaces}
              onMarkerClick={this.onMarkerClick}
            />

           <Map
              places={this.state.places}
              showedPlaces={this.state.showedPlaces}
              onMarkerClick={this.onMarkerClick}
              markerId={this.state.markerId}
              toggle={this.state.toggle}
              loadingElement = {<div style={{ height: `100%` }}/>}
              containerElement={<div style={{width:`100%`}} className="map" role="application" tabIndex="0"></div>}
              mapElement={<div style={{ height: `100vh` }} />}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAv6-Q3HLVuAbFkKfQHjyoeRtyEsHMYF_A&v=3`}
            />


        </main>
        <footer tabIndex={0}>
          		 Project by Alessia Alessandri for the Udacity FEND Nanodegree. Integrated with
               <a href="https://developers.google.com/maps/" tabIndex={0} aria-label="Google maps for developer site">Google Maps</a>
               and <a href="https://developer.foursquare.com/" tabIndex={0} aria-label="Foursquare for developer site">Foursquare</a> APIs.
      	</footer>
      </div>
    );
  }
}

// Load Google maps API with react-async-script-loader
export default App;
