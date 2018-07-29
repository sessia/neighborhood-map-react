import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
/* global google */

const MapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{lat: 43.7695604, lng: 11.2558136}}
  >
    {props.isMarkerShown && <Marker position={{lat: 43.7695604, lng: 11.2558136}} />}
  </GoogleMap>
))

export default MapComponent;
