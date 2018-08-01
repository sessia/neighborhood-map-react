/*global google*/

import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import { getLocations } from '../foursquareAPI';
import markerIcon from '../marker.svg';
import selectedMarkerIcon from '../selectedMarker.svg';

class MarkersData extends Component {
  state = {
    placeInfo: {},
    error: false,
    infoLoaded: false
  }

  //Load details
  componentDidMount() {
    const placeId = this.props.placeId;

    getLocations(placeId)
      .then(placeInfo => {
        this.setState({placeInfo, infoLoaded: true})
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  render() {
    const { placeInfo, error, infoLoaded } = this.state;
    const { placeId, placePos, onMarkerClick, toggle, markerId} = this.props;

    return (
      <Marker
        key={placeId}
        position={placePos}
        onClick={() => onMarkerClick(placeId,'view')}
        animation={google.maps.Animation.DROP}
        icon={markerId === placeId && toggle === 'view' ? { url:selectedMarkerIcon, scale: 1 } : { url:markerIcon, scale: 1 }}
      >

        {
          (toggle === 'view' && markerId===placeId) &&
          <InfoWindow
            key={placeId}
            onCloseClick={() => onMarkerClick(placeId,'hide')}
          >

          {
            error ? (
              <div className="place-details" tabIndex="0" key={placeId}>
                    Sorry we were unable to retrieve information from Foursquare. Try again later
              </div>
            )
            :

          <div className="place-details" tabIndex="0" key={placeId}>
                <h3 className="place-title">
                  {placeInfo.name}
                </h3>
                <div className="place-address">{placeInfo.location.address || "Unknown address"}</div>
                <div className="place-rating">This place rating is {placeInfo.rating}</div>
          </div>
        }
          </InfoWindow>
        }
      </Marker>
    );
  }
}

export default MarkersData;
