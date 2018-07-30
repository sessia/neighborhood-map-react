import React from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import MarkersData from './MarkersData.js';


const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{lat: 43.7695604, lng: 11.2558136}}
  >

  {
      props.showedPlaces.length === 0 ?
        props.places.map((place, index) => (
            <MarkersData
              key={index}
              placeId={place.id}
              placePos={place.position}
            />
        ))
      :
        props.showedPlaces.map((place, index) => (
          <MarkersData
            key={index}
            placeId={place.id}
            placePos={place.position}
          />
        ))
    }

  </GoogleMap>
))


export default Map;
