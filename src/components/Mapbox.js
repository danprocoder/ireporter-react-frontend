import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFubnltYXBzIiwiYSI6ImNqbGh4cDFnczA3dDUzcG15N2lybDczYWMifQ.g4l-gTR_N48LYnFcevdw0A';

class Mapbox extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: this.props.coords,
      zoom: 9
    });
    
    const { lng, lat } = this.props.coords;
    this.marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(this.map);
  }

  render() {
    return <div id="map-container" ref={el => this.mapContainer = el}></div>
  }
}

export default Mapbox;
