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
    query: '',
    showInfoId: false,
    action: '',
    mapReady: false,
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
        if (window.google) {
              this.setState({mapReady: true});
        }
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
      showedPlaces: placesInfo,
      loaded: true
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

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Filter
              data={this.state}
              onMarkerClick={this.onMarkerClick}
              filterPlaces={this.filterPlaces}
            />
            <div className="map-wrapper">
                        {(this.state.mapReady && this.state.data) && (
                          <Map
                            onMarkerClick={this.onMarkerClick}
                            showInfoId={this.state.showInfoId}
                            action={this.state.action}
                            places={this.state.places}
                            showedPlaces={this.state.showedPlaces}
                            containerElement = {<main className="map" role="application" tabIndex="0"></main>}
                            mapElement = {<div style={{height:100+'%'}}/>}
                            mapContainer={<main className="map" role="application" tabIndex="0"></main>}
                          />)}
                    </div>

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
