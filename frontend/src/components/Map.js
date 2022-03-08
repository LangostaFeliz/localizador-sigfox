import * as React from 'react';
import { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, { Marker, NavigationControl, Source, Layer } from 'react-map-gl';
import useMediaQuery from '@mui/material/useMediaQuery';
import config from '../config'
import axios from 'axios'
import styles from './Map.module.css'
import LocationCard from './LocationCard'

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
export default function Map({ searchForm, submit, mapData }) {
  const size=useWindowSize()
  console.log(size)
  const [viewport, setViewport] = useState({
    width: 1000,
    height: 750,
    latitude: 32.504002,
    longitude: -116.972579,
    zoom: 8
  });
  const [geojson, setGeoJson] = useState({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          properties: {},
          coordinates: [
          ]
        }
      }
    ]
  }
  )
  const layerStyle = {
    id: 'LineString',
    type: 'line',
    source: 'LineString',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#BF93E4',
      'line-width': 5
    }
  };
  const [items, setItems] = useState()
  const [locationData, setLocationData] = useState()
  const [showDataState, setShowDataState] = useState(false)

  function onClickButton(data) {
    setShowDataState(false)
    setLocationData(data)
    setShowDataState(true)
  }
  function onChangeShowDataState() {
    setShowDataState(!showDataState)
  }
  useEffect(async () => {
    let array = []
    setViewport(prevState => ({ ...prevState,width:size.width >960? size.width/2 :size.width-40}))
    setViewport(prevState => ({ ...prevState,height:size.width >960? 750 :400}))
    if (mapData) {
      mapData.map(element => {
        array.push([element.coordinates.lng, element.coordinates.lat])
      })
      let newGeoJson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              properties: {},
              coordinates: array
            }
          }
        ]
      };
      setGeoJson(newGeoJson)
      setViewport(prevState => ({ ...prevState, latitude: mapData[0].coordinates.lat }))
      setViewport(prevState => ({ ...prevState, longitude: mapData[0].coordinates.lng }))
      console.log(newGeoJson)
    }


  }, [mapData,size])


  return (
    <div>
      <div style={{margin:10}}>
        <ReactMapGL
          {...viewport}
          onViewportChange={nextViewport => setViewport(nextViewport)}
          mapboxApiAccessToken={config.mapBoxAccessToken}
          mapStyle="mapbox://styles/mapbox/streets-v11">
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
          {/* <NavigationControl style={{ right: 10, top: 10 }} /> */}
          {mapData && mapData.map((item, index) => {
            return <Marker
              key={item.createdAt}
              latitude={item.coordinates.lat}
              longitude={item.coordinates.lng}>
              <button className={styles.button}
                onClick={() => { onClickButton(item) }}>
                {index}
              </button>
            </Marker>
          })}
        </ReactMapGL>
      </div>
      {showDataState ? <LocationCard location={locationData} onChangeShowDataState={onChangeShowDataState}/>:""}

    </div>
  );
}