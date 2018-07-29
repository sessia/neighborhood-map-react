/*global google*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker, InfoWindow } from 'react-google-maps';
import { getLocations } from '../foursquareAPI';

class MarkersData extends Component {
  state = {
    loaded: false,
    error: false,
    placeDetails: {}
  }

  //Load place placeDetails

  componentDidMount() {
    const placeId = this.props.placeId;

    getLocations(placeId)
      .then(placeDetails => {
        this.setState({ placeDetails, loaded: true })
      })
      .catch(err => {
        console.log('Foursquare API returned with ', err);
        this.setState({ error: true });
      });
  }

  render() {
    const { loaded, error, placeDetails } = this.state;
    const { placeId, placePos, onMarkerClick, showInfoId, action } = this.props;

    return (
      <Marker
        key={placeId}
        position={placePos}
        animation={google.maps.Animation.DROP}
        onClick={() => onMarkerClick(placeId, 'open')}
      >
        
      </Marker>
    );
  }
}

MarkersData.propTypes = {
  key: PropTypes.string.isRequired,
  placeId: PropTypes.string.isRequired,
  placePos: PropTypes.object.isRequired,
  onMarkerClick: PropTypes.func.isRequired,
  showInfoId: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired
}

export default MarkersData;
