/*global google*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker, InfoWindow } from 'react-google-maps';
import { getLocations } from '../foursquareAPI';

class MarkersData extends Component {
  state = {
    placeDetails: {},
    error: false
  }

  //Load details
  componentDidMount() {
    const placeId = this.props.placeId;

    getLocations(placeId)
      .then(placeDetails => {
        this.setState({ placeDetails})
      })
      .catch(err => {
        console.log(err, 'from Foursquare API');
        this.setState({ error: true });
      });
  }

  render() {
    const { error, placeDetails } = this.state;
    const { placeId, placePos, showInfoId } = this.props;

    return (
      <Marker
        key={placeId}
        position={placePos}
        animation={google.maps.Animation.DROP}
      >

      </Marker>
    );
  }
}

MarkersData.propTypes = {
  placeId: PropTypes.string.isRequired,
  placePos: PropTypes.object.isRequired,
}

export default MarkersData;
