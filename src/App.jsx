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
                  // Colors based on 5 equally spaced from 'turbo' colormap
                  1, '#28BCEB',
                  2, '#A4FC3C',
                  3, '#FB7E21',
                  4, '#7A0403',
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