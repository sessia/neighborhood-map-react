import React from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap} from 'react-google-maps';
import MarkersData from './MarkersData.js';

const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{lat: 43.7695604, lng: 11.2558136}}
  >


  </GoogleMap>
))

Map.propTypes = {
  onMarkerClick: PropTypes.func.isRequired,
  
  action: PropTypes.string.isRequired,
  places: PropTypes.array.isRequired,
  showedPlaces: PropTypes.array.isRequired
}


export default Map;
