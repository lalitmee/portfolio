import React from 'react';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';

const Map = withGoogleMap(props => (
  <GoogleMap defaultZoom={4} defaultCenter={{ lat: 12.916, lng: 77.61 }}>
    {props.isMarkerShown && <Marker position={{ lat: 12.916, lng: 77.61 }} />}
  </GoogleMap>
));

export default Map;
