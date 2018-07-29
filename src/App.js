import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header.js';
import Filter from './components/Filter.js';
import Map from './components/Map.js';
import places from './places.json'
import scriptLoader from 'react-async-script-loader';

class App extends Component {

  state = {
    markers: [],
    map: '',
    scriptFail: false,
    place: "",
    infoWindow: '',
    showAside: false
  }

// Handling errors om Google Maps
  componentDidMount() {
     window.gm_authFailure = this.gm_authFailure;
   }

  gm_authFailure = () => {
    window.alert("Google maps authentication error");
  }

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

  initMap = () => {
      let app = this;
      let map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 43.7695604, lng: 11.2558136},
        zoom: 13
      });
      let markers = [];
      let infoWindow = new window.google.maps.InfoWindow();
      for (let place of places) {
        let marker = new window.google.maps.Marker({
          position: place.location,
          map: map,
          title: place.title,
          // Create a drop marker effect
          animation: window.google.maps.Animation.DROP
        });
        markers.push(marker);
        marker.addListener('click', function(e) {
          app.setState(() => ({
            place: place.title
          }))
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(function () {
            marker.setAnimation(null);
            app.renderInfoWindow(marker, infoWindow, place, map);
          }, 600)
        })
      }
      this.setState(() => ({
        markers: markers,
        map: map,
        infoWindow: infoWindow
      }))
    }

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <aside>
            <Filter />
          </aside>
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
