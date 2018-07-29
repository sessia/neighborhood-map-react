import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header.js';
import Filter from './components/Filter.js';
import Map from './components/Map.js';
import placesInfo from './places.json'
import scriptLoader from 'react-async-script-loader';
import escapeRegExp from 'escape-string-regexp';

class App extends Component {

  state = {
    places: [],
    showedPlaces: [],
    query: ''
  }

// Handling errors on Google Maps
  componentDidMount() {
     window.gm_authFailure = this.gm_authFailure;
   }

  gm_authFailure = () => {
    window.alert("Google maps authentication error");
  }

//Loading async script
  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.initMap()
      }
      else {
        this.setState(() => ({
           scriptFail: true
        }))
      }
    }
  }

//Loading places data
  componentDidMount() {
    this.setState({
      places: placesInfo,
      showedPlaces: placesInfo
    });
  }

  //when a marker is clicked
  onMarkerClick = (id, action) => {
    this.setState({
      showInfoId: id,
      action
    });
  }

  //Apply a filter when writing on the search box
  filterPlaces = (query) => {
    const { places } = this.state;
    let showedPlaces;

    // update query in state
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


  initMap = () => {
      let app = this;
      let map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 43.7695604, lng: 11.2558136},
        zoom: 13
      });
      let markers = [];
      let infoWindow = new window.google.maps.InfoWindow();
      
    }

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Filter
              data={this.state}
              onAsideOpen={this.onToggleOpen}
              filterPlaces={this.filterPlaces}
            />
          <section id="map-container">
            <div id="map" role="application" style={{height:"100%"}}>

            </div>
          </section>
        </main>
        <footer tabIndex={0}>
          		 Project by Alessia Alessandri for the Udacity FEND Nanodegree. Integrated with
               <a href="https://developers.google.com/maps/" role="link" tabIndex={0} aria-label="Google maps for developer site">Google Maps</a>
               and <a href="https://developer.foursquare.com/" role="link" tabIndex={0} aria-label="Foursquare for developer site">Foursquare</a> APIs.
      	</footer>
      </div>
    );
  }
}

// Load Google maps API with react-async-script-loader
export default scriptLoader(
    [`https://maps.googleapis.com/maps/api/js?key=AIzaSyAv6-Q3HLVuAbFkKfQHjyoeRtyEsHMYF_A&libraries=places`]
)(App);
