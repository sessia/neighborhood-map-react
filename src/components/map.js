import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import MarkersData from './MarkersData.js';


const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{lat: 43.7695604, lng: 11.2558136}}
  >

  {
      props.showedPlaces.length === 0 ?
        props.places.map(place => (
            <MarkersData
              key={place.id}
              placeId={place.id}
              placePos={place.position}
              onMarkerClick={props.onMarkerClick}
              toggle={props.toggle}
              markerId={props.markerId}
            />
        ))
      :
        props.showedPlaces.map(place => (
          <MarkersData
            key={place.id}
            placeId={place.id}
            placePos={place.position}
            onMarkerClick={props.onMarkerClick}
            toggle={props.toggle}
            markerId={props.markerId}
          />
        ))
    }

  </GoogleMap>
))


export default Map;
