import React, { Component } from 'react';
import { object as objectProps } from 'prop-types';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFubnltYXBzIiwiYSI6ImNqbGh4cDFnczA3dDUzcG15N2lybDczYWMifQ.g4l-gTR_N48LYnFcevdw0A';

class Mapbox extends Component {
  componentDidMount() {
    const { coords } = this.props;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: coords,
      zoom: 9,
    });

    const { lng, lat } = coords;
    this.marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(this.map);
  }

  render() {
    return (<div id="map-container" ref={(el) => { this.mapContainer = el; }} />);
  }
}

Mapbox.propTypes = {
  coords: objectProps.isRequired,
};

export default Mapbox;
