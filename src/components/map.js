import React from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import MarkersData from './MarkersData.js';
/* global google */

const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{lat: 43.7695604, lng: 11.2558136}}
  >

  props.showedPlaces.length === 0 ?
    props.places.map(place => (
        <MarkersData
          key={props.place.id}
          placeId={this.props.place.id}
          placePos={this.props.place.position}
          onMarkerClick={props.onMarkerClick}
          showInfoId={props.showInfoId}
          action={props.action}
        />
    ))
  :
    props.showedPlaces.map(place => (
      <MarkersData
        key={props.place.id}
        placeId={this.props.place.id}
        placePos={this.props.place.position}
        onMarkerClick={props.onMarkerClick}
        showInfoId={props.showInfoId}
        action={props.action}
      />
    ))
}

  </GoogleMap>
))

Map.propTypes = {
  onMarkerClick: PropTypes.func.isRequired,
  showInfoId: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  places: PropTypes.array.isRequired,
  showedPlaces: PropTypes.array.isRequired
}


export default withGoogleMap(Map);
