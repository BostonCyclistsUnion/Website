import { useRef, useEffect, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server';
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'

import InfoSimple from './InfoSimple'
import InfoDetail from './InfoDetail'
import SideBar from './SideBar'

import icon_lts1 from '/Icon_LTS1.svg'
import icon_lts2 from '/Icon_LTS2.svg'
import icon_lts3 from '/Icon_LTS3.svg'
import icon_lts4 from '/Icon_LTS4.svg'
import text_lts1 from '/Text_LTS1.svg'
import text_lts2 from '/Text_LTS2.svg'
import text_lts3 from '/Text_LTS3.svg'
import text_lts4 from '/Text_LTS4.svg'
import logo_stressmap from '/BikeStressMap.svg'

// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/

const INITIAL_CENTER = [-71.05777, 42.3224]
const INITIAL_ZOOM = 11.4
const LINE_WIDTH = 3;

const LEGEND_HEIGHT_DEFAULT = 50
const LEGEND_HEIGHT_HOVER = 100

function App() {
  // stores the feature that the user is currently viewing (triggers the modal)
  const [activeFeature, setActiveFeature] = useState()
  const [advancedMode, setAdvancedMode] = useState(false);
  console.log('advancedMode:', advancedMode);

  // for toggling between map view and card view on small screens
  // From https://github.com/mapbox/public-tools-and-demos/blob/main/projects/demo-realestate/src/App.jsx
  // still need to figure out how this works
  const [activeMobileView, setActiveMobileView] = useState('map')

  const mapRef = useRef()
  const mapContainerRef = useRef()

  const [center, setCenter] = useState(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)

  // on click, set the active feature
  const handleFeatureClick = (feature) => {
    setActiveFeature(feature)
  }

  // when the modal is closed, clear the active feature
  const handleModalClose = () => {
    setActiveFeature(undefined)
  }

  const handleAdvancedMode = () => {
    console.log('advancedMode switched from', advancedMode);
    setAdvancedMode(advancedMode => !advancedMode);
  }
  

  // toggle the map and card view on mobile devices
  const handleActiveMobileClick = () => {
    if (activeMobileView === 'map') {
      setActiveMobileView('cards')
    } else {
      setActiveMobileView('map')
    }
  }

  // Load Mapbox map with:
  // - add LTS layer
  // - get current center of map view
  // - 
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
      })

      // Add LTS data layer
      mapRef.current.addLayer({
          'id': 'lts-layer',
          "type": "line",
          'source': 'LTS_source',
          'source-layer': 'lts',
          'paint': {
              'line-color': [
                  'match',
                  ['get', 'LTS'],
                  // Colors chosen by Adam L
                  1, '#63B281',
                  2, '#DDA34E',
                  3, '#AA5939',
                  4, '#522B2A',
                  'white'
              ],
              'line-width': LINE_WIDTH
          }
      },
      'road-label-simple' // Add layer below labels
      )

      // get the current center coordinates and zoom level from the map
      mapRef.current.on('move', () => {
        const mapCenter = mapRef.current.getCenter()
        const mapZoom = mapRef.current.getZoom()

        // update state
        setCenter([ mapCenter.lng, mapCenter.lat ])
        setZoom(mapZoom)
      })

      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      mapRef.current.on('click', 'lts-layer', (e) => {
        console.log(e.features[0])
        console.log(e.features[0].geometry.coordinates)

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice(); // I don't think this works with line strings
        const description = renderToStaticMarkup(<InfoSimple e={e}/>)
        
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
            .addTo(mapRef.current);
      });

      // Change the cursor to a pointer when the mouse is over the LTS layer.
      mapRef.current.on('mouseenter', 'lts-layer', () => {
        mapRef.current.getCanvas().style.cursor = 'pointer'
      })

      // Change it back to a pointer when it leaves.
      mapRef.current.on('mouseleave', 'lts-layer', () => {
        mapRef.current.getCanvas().style.cursor = '';
      })
    })

    return () => {
      mapRef.current.remove()
    }
  }, [])

  const handleResetZoom = () => {
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

      <div className="legend grid-container">
          <div className="legend-header-hover">
            <img src={logo_stressmap} alt='Legend' class='hover-image'/>
          </div>
          
          <div className="legend-icon">
            <img src={icon_lts1} height={LEGEND_HEIGHT_DEFAULT} alt='LTS 1' class='default-image'/>
            <img src={icon_lts1} height={LEGEND_HEIGHT_HOVER} alt='LTS 1' class='hover-image'/>
          </div>
          <div className="legend-text">
            <img src={text_lts1} height={LEGEND_HEIGHT_HOVER} alt='Carefree riding' class='hover-image'/>
          </div>

          <div className="legend-icon">
            <img src={icon_lts2} height={LEGEND_HEIGHT_DEFAULT} alt='LTS 2' class='default-image'/>
            <img src={icon_lts2} height={LEGEND_HEIGHT_HOVER} alt='LTS 2' class='hover-image'/>
          </div>
          <div className="legend-text">
            <img src={text_lts2} height={LEGEND_HEIGHT_HOVER} alt='Easy going riding' class='hover-image'/>
          </div>

          <div className="legend-icon">
            <img src={icon_lts3} height={LEGEND_HEIGHT_DEFAULT} alt='LTS 3' class='default-image'/>
            <img src={icon_lts3} height={LEGEND_HEIGHT_HOVER} alt='LTS 3' class='hover-image'/>
          </div>
          <div className="legend-text">
            <img src={text_lts3} height={LEGEND_HEIGHT_HOVER} alt='Stressful riding' class='hover-image'/>
          </div>

          <div className="legend-icon">
            <img src={icon_lts4} height={LEGEND_HEIGHT_DEFAULT} alt='LTS 4' class='default-image'/>
            <img src={icon_lts4} height={LEGEND_HEIGHT_HOVER} alt='LTS 4' class='hover-image'/>
          </div>
          <div className="legend-text">
            <img src={text_lts4} height={LEGEND_HEIGHT_HOVER} alt='White knuckle riding' class='hover-image'/>
          </div>
      </div>

      <button className='reset-button' onClick={handleResetZoom}>
        Reset
      </button>
      <button className='advanced-button' onClick={handleAdvancedMode}>
        Show extra details
      </button>

      

      <div id='map-container' ref={mapContainerRef} />

      <div id='sidebar'>
        <SideBar advancedMode={advancedMode}/>
      </div>
    </>
  )
}

export default App