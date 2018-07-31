/*global google*/

import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import { getLocations } from '../foursquareAPI';

class MarkersData extends Component {
  state = {
    placeInfo: {},
    error: false
  }

  //Load details
  componentDidMount() {
    const placeId = this.props.placeId;

    getLocations(placeId)
      .then(placeInfo => {
        this.setState({placeInfo})
      })
      .catch(err => {
        console.log(err, 'from Foursquare API');
        this.setState({ error: true });
      });
  }

  render() {
    const { error, placeInfo } = this.state;
    const { placeId, placePos, onMarkerClick, toggle, markerId} = this.props;

    return (
      <Marker
        key={placeId}
        position={placePos}
        onClick={() => onMarkerClick(placeId,'view')}
        animation={google.maps.Animation.DROP}
      >

      {
        (toggle === 'view') &&
        <InfoWindow
          key={placeId}
          onCloseClick={() => onMarkerClick(placeId,'hide')}
        >

        <div className="place-details" tabIndex="0" key={placeId}>
              <h3 className="place-title">
                <a href={placeInfo.canonicalUrl}>{placeInfo.name}</a>
              </h3>
              <div className="place-image">
                <img src={`${placeInfo.bestPhoto.prefix}width150${placeInfo.bestPhoto.suffix}`} alt={`Best of ${placeInfo.name}`} />
              </div>
              <p className="place-address">{placeInfo.location.address || 'We do not know the address'}</p>
              <div
                className="place-rating"
                title={`This place is rated ${placeInfo.rating}`}
              >
                <p className="rating-value" aria-hidden="true">{placeInfo.rating}</p>
              </div>
              <div className="place-price" title={`Going here costs ${placeInfo.price.message}`}>
                <span aria-hidden="true">{placeInfo.attributes.groups['0'].summary}</span>
              </div>
              <div className="place-category">
                {
                  placeInfo.categories.map(category =>
                    <span key={category.id} className="category-names">{category.name} </span>
                  )
                }
              </div>
              <a className="details-more" href={placeInfo.canonicalUrl} title="See all in Foursquare">
                Se all in Foursquare website
              </a>
            </div>
          </InfoWindow>
        }
      </Marker>
    );
  }
}

export default MarkersData;
