import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'

// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/

const INITIAL_CENTER = [-71.05777, 42.3224]
const INITIAL_ZOOM = 11.4
const LINE_WIDTH = 3;

function App() {
  const mapRef = useRef()
  const mapContainerRef = useRef()

  const [center, setCenter] = useState(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2tpbGNveW5lIiwiYSI6ImNseTd2cXpwOTA5MnUya3E2ejBkN2ttOW8ifQ.TN39Bd_yu_SqMsu-IW4FKQ'
    mapRef.current = new mapboxgl.Map({ // Can add more options here: https://docs.mapbox.com/mapbox-gl-js/api/map/#map-parameters
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
      style: 'mapbox://styles/mapbox/light-v11'
    });

    mapRef.current.on('load', function () {
      mapRef.current.addSource('LTS_source', {
          type: 'vector',
          url: 'mapbox://skilcoyne.stressmap_tiles'
      });

      mapRef.current.addLayer({
          'id': 'lts-layer',
          "type": "line",
          'source': 'LTS_source',
          'source-layer': 'lts',
          'paint': {
              'line-color': [
                  'match',
                  ['get', 'LTS'],
                  // 0, 'black',
                  // // Colors based on 5 equally spaced from 'turbo' colormap
                  // 1, '#28BCEB',
                  // 2, '#A4FC3C',
                  // 3, '#FB7E21',
                  // 4, '#7A0403',
                  // Colors chosen by Adam L
                  1, '#63B281',
                  2, '#DDA34E',
                  3, '#AA5939',
                  4, '#522B2A',
                  'white'
              ],
              'line-width': LINE_WIDTH
              // 'line-opacity': 0.5,
          }
      },
      'road-label-simple' // Add layer below labels
  );})

    mapRef.current.on('move', () => {
      // get the current center coordinates and zoom level from the map
      const mapCenter = mapRef.current.getCenter()
      const mapZoom = mapRef.current.getZoom()

      // update state
      setCenter([ mapCenter.lng, mapCenter.lat ])
      setZoom(mapZoom)
    })

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    mapRef.current.on('click', 'lts-layer', (e) => {
      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice(); // I don't think this works with line strings
      const description = `
      <h1>${e.features[0].properties.name}</h1>
      <p>Road Type: ${e.features[0].properties.highway}<br></p>
      <table>
          <tr>
              <th>Value</th>
              <th>Left</th>
              <th>Right</th>
          </tr>
          <tr>
              <td><b>LTS</b></td>
              <td><b>${e.features[0].properties.LTS_left}</b></td>
              <td><b>${e.features[0].properties.LTS_right}</b></td>
          </tr>
          <tr>
              <td colspan="3"><b>Bike Infrastructure</b></td>
          </tr>
          <tr>
              <td>Bike Permitted</td>
              <td>${e.features[0].properties.biking_permitted_left} <font color="gray">${e.features[0].properties.biking_permitted_rule_left}</font></td>
              <td>${e.features[0].properties.biking_permitted_right} <font color="gray">${e.features[0].properties.biking_permitted_rule_right}</font></td>
          </tr>
          <tr>
              <td>Bike Lane</td>
              <td>${e.features[0].properties.bike_lane_exist_left} <font color="gray">${e.features[0].properties.bike_lane_exist_rule_left}</font></td>
              <td>${e.features[0].properties.bike_lane_exist_right} <font color="gray">${e.features[0].properties.bike_lane_exist_rule_right}</font></td>
          </tr>
      </table>`;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      if (['mercator', 'equirectangular'].includes(mapRef.current.getProjection().name)) {
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
      }

      new mapboxgl.Popup()
          .setLngLat(e.lngLat) // Changed to use click location instead of feature location (I think)
          .setHTML(description)
          .setMaxWidth("600px")
          .addTo(mapRef);
    });

    // Change the cursor to a pointer when the mouse is over the LTS layer.
    mapRef.current.on('mouseenter', 'lts-layer', () => {
      mapRef.current.getCanvas().style.cursor = 'pointer'
    })

    // Change it back to a pointer when it leaves.
    mapRef.current.on('mouseleave', 'lts-layer', () => {
      mapRef.current.getCanvas().style.cursor = '';
    })

    return () => {
      mapRef.current.remove()
    }
  }, [])

  const handleButtonClick = () => {
    mapRef.current.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM
    })
  }

  return (
    <>
      <div className="topbar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
      </div>
      <button className='reset-button' onClick={handleButtonClick}>
        Reset
      </button>
      <div id='map-container' ref={mapContainerRef} />

      {/* sidebar */}
      <div id='sidebar' className='sidebar'>
        <div className='text-2xl text-black font-semibold w-full mb-1.5'>
          Test Sidebar
        </div>
        {/* <div className='mb-4'>
          <div className='font-medium text-gray-500'>
            {currentViewData.length} results
          </div>
        </div> */}
        {/* <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4'>
          {currentViewData.map((feature, i) => {
            return (
              <div key={i} className='mb-1.5'>
                <Card feature={feature} onClick={handleFeatureClick} />
              </div>
            )
          })}
        </div> */}
      </div>
      {/* end sidebar */}
    </>
  )
}

export default App