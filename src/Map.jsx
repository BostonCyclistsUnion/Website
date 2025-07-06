import { useRef, useEffect, useState } from 'react'
// import { renderToStaticMarkup } from 'react-dom/server';
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'

// import InfoSimple from './InfoSimple'
// import InfoDetail from './InfoDetail'
import Legend from './Legend';
import SideBar, {ModeToggle} from './components/selection/SideBar'
// import {ModeToggle} from './components/selection/SideBar'
import Overpass from './components/Overpass/overpass';
import Bluebikes from './components/GBFS/GBFS';

// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/

const INITIAL_CENTER = [-71.0809, 42.3473]
const INITIAL_ZOOM = 12
const MAX_ZOOM = 18
const MIN_ZOOM = 12
const ZOOM_UNION = 12
const BOUNDS = [
  [-71.2000, 42.1800], // Southwest coordinates
  [-70.9000, 42.4600] // Northeast coordinates
];
const LINE_WIDTH = 4

const COLOR_SCALE = ['#007191', '#62c8d3', '#f47a00', '#d31f11', 'grey'] // https://www.simplifiedsciencepublishing.com/resources/best-color-palettes-for-scientific-figures-and-data-visualizations
// rgb(0, 113, 145), rgb(98, 200, 211), rgb(244, 122, 0), rgb(211, 31, 17)


function Map() {
  // stores the feature that the user is currently viewing (triggers the modal)
  const [activeFeature, setActiveFeature] = useState()
  const [activeFeatureType, setActiveFeatureType] = useState()
  const [advancedMode, setAdvancedMode] = useState(false);
  // console.log('advancedMode:', advancedMode);

  // for toggling between map view and card view on small screens
  // From https://github.com/mapbox/public-tools-and-demos/blob/main/projects/demo-realestate/src/App.jsx
  // still need to figure out how this works
  const [activeMobileView, setActiveMobileView] = useState('map')

  const mapRef = useRef()
  const mapContainerRef = useRef()

  const [center, setCenter] = useState(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)

  // // on click, set the active feature
  // const handleFeatureClick = (feature) => {
  //   setActiveFeature(feature)
  // }

  // // when the modal is closed, clear the active feature
  // const handleModalClose = () => {
  //   setActiveFeature(undefined)
  // }

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
  // - get current center and zoom of map view
  // - allow user to click on street segments from LTS layer, data saved to state variable
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2tpbGNveW5lIiwiYSI6ImNseTd2cXpwOTA5MnUya3E2ejBkN2ttOW8ifQ.TN39Bd_yu_SqMsu-IW4FKQ'
    mapRef.current = new mapboxgl.Map({ // Can add more options here: https://docs.mapbox.com/mapbox-gl-js/api/map/#map-parameters
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      maxBounds: BOUNDS,
      // style: 'mapbox://styles/mapbox/light-v11',
      // light-v11 doesn't seem like able to show T stations, using config can mimic light-v11 on standard style
      style: 'mapbox://styles/mapbox/standard',
      config: {
        basemap: {
          lightPreset: 'day',
          showPlaceLabels: false,
          showPointOfInterestLabels: false,
          theme: 'monochrome',
          show3dObjects: false,
          showTransitLabels: true,
          showRoadLabels: true
        }
      }
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
          'source-layer': 'lts', // replaces 'road-label-simple' which seems to work for light-v11 but not standard style
          'slot': 'middle',
          'paint': {
              'line-color': [
                  'match',
                  ['get', 'LTS'],
                  1, COLOR_SCALE[0],
                  2, COLOR_SCALE[1],
                  3, COLOR_SCALE[2],
                  4, COLOR_SCALE[3],
                  COLOR_SCALE[4]
              ],
              'line-width': LINE_WIDTH,
              // 'line-dasharray': [ // this just doesn't render very good looking
              //     'match',
              //     ['get', 'LTS'],
              //     1, ["literal", [1, 0]],
              //     2, ["literal", [2, 2]],
              //     3, ["literal", [1, 3]],
              //     4, ["literal", [1, 5]],
              //     ["literal", [1, 1]]
              // ],
          }
      },
      // 'road-label-simple' // Add layer below labels
      )

      // Add selected LTS segment layer
      mapRef.current.addLayer(
        {
          'id': 'selected-lts',
          "type": "line",
          'source': 'LTS_source',
          'source-layer': 'lts',
          'slot': 'middle',
          'paint': {
              'line-color': [
                  'match',
                  ['get', 'LTS'],
                  1, COLOR_SCALE[0],
                  2, COLOR_SCALE[1],
                  3, COLOR_SCALE[2],
                  4, COLOR_SCALE[3],
                  COLOR_SCALE[4]
              ],
              'line-width': LINE_WIDTH * 3
            },
          filter: ['in', 'osmid', '']
        },
        // 'road-label-simple'
      );

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
        console.log('App/map/click/e.features[0]', e.features[0])
        console.log('App/map/click/e.features[0].geometry.coordinates', e.features[0].geometry.coordinates)

        setActiveFeature(e.features[0])
        setActiveFeatureType('lts')
        // console.log('App/map/click/e.features[0].id', e.features[0].id)
        mapRef.current.setFilter('selected-lts', ['in', 'osmid', e.features[0].id]);

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice(); // I don't think this works with line strings
        // let description = renderToStaticMarkup(<InfoSimple selectedFeature={activeFeature}/>)
        
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        if (['mercator', 'equirectangular'].includes(mapRef.current.getProjection().name)) {
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
        }

        // new mapboxgl.Popup()
        //     .setLngLat(e.lngLat) // Changed to use click location instead of feature location (I think)
        //     .setHTML(description)
        //     .setMaxWidth("600px")
        //     .addTo(mapRef.current);
      });

      // Change the cursor to a pointer when the mouse is over the LTS layer.
      mapRef.current.on('mouseenter', 'lts-layer', () => {
        mapRef.current.getCanvas().style.cursor = 'pointer'
      })

      // Change it back to a pointer when it leaves.
      mapRef.current.on('mouseleave', 'lts-layer', () => {
        mapRef.current.getCanvas().style.cursor = '';
      })

      // Add fullscreen button
      mapRef.current.addControl(new mapboxgl.FullscreenControl());
    })

    return () => {
      mapRef.current.remove()
    }
  }, [])

  const handleReset = () => {
    // Reset zoom
    mapRef.current.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM
    })
    // Deactivate selected features
    setActiveFeature()
    setActiveFeatureType()
    mapRef.current.setFilter('selected-lts', ['in', 'osmid', '']);
  }

  const [bikeParking, setBikeParking] = useState(false);
  // handleBikeParking(bikeParking)
  // console.log('bikeParking is created and set to ' + bikeParking)
  const [bluebikeStations, setBluebikeStations] = useState(false);
  // handleBluebikeStations(bluebikeStations)
  // console.log('bluebikeStations is created and set to ' + bluebikeStations)

  const handleBikeParking = (checkboxState) => {
    setBikeParking(checkboxState)
    console.log('Bike parking checkbox changed to ' + !bikeParking);
    var bikeParkingLayerName = 'bike-parking-layer'

    // Create bike parking layer if needed
    if(checkboxState) {
      if(typeof mapRef.current.getLayer(bikeParkingLayerName) == 'undefined') {
        Overpass(mapRef).then((bike_parking_json) => {
          // console.log(bike_parking_json),
          mapRef.current.addSource('bike-parking', {
                  type: 'geojson',
                  // Use a URL for the value for the `data` property.
                  data: bike_parking_json
              }),
          mapRef.current.addLayer({
                  'id': bikeParkingLayerName,
                  'type': 'circle',
                  'source': 'bike-parking',
                  'paint': {
                      'circle-radius': 3,
                      'circle-stroke-width': 1,
                      'circle-color': COLOR_SCALE[0],
                      'circle-stroke-color': 'white'
                  },
                  layout: {
                    'visibility': 'visible'
                  }
              })
          mapRef.current.on('click', bikeParkingLayerName, (e) => {
            console.log('App/map/click/e.features[0]', e.features[0])
            console.log('App/map/click/e.features[0].geometry.coordinates', e.features[0].geometry.coordinates)

            setActiveFeature(e.features[0])
            setActiveFeatureType('bikeParking')
          })
          // Change the cursor to a pointer when the mouse is over the LTS layer.
          mapRef.current.on('mouseenter', bikeParkingLayerName, () => {
            mapRef.current.getCanvas().style.cursor = 'pointer'
          })

          // Change it back to a pointer when it leaves.
          mapRef.current.on('mouseleave', bikeParkingLayerName, () => {
            mapRef.current.getCanvas().style.cursor = '';
          })
        });
      } else {
        console.log("Turning on " + bikeParkingLayerName)
        mapRef.current.setLayoutProperty(bikeParkingLayerName, 'visibility', 'visible');
      }
    } else {
      console.log("Turning off " + bikeParkingLayerName)
      mapRef.current.setLayoutProperty(bikeParkingLayerName, 'visibility', 'none');
    }
  }

  const handleBluebikeStations = (checkboxState) => {
    setBluebikeStations(checkboxState)
    console.log('bluebikeStations checkbox changed to ' + !bluebikeStations);
    var bluebikeLayerName = 'bluebike-layer'

    if(checkboxState) {
      if(typeof mapRef.current.getLayer(bluebikeLayerName) == 'undefined') {
        Bluebikes().then((bluebikeStationsGeojson) => {
          // console.log('bluebikeStationsGeojson', bluebikeStationsGeojson)
          console.log('bluebikeStationsGeojson loaded')
          mapRef.current.loadImage('/bluebike_classic.png', (error, image) => {
            if (error) throw error;
            // Add the loaded image to the style's sprite.
            mapRef.current.addImage('bluebike_classic_img', image);
          
            mapRef.current.addSource('bluebike-stations', {
                  type: 'geojson',
                  data: bluebikeStationsGeojson
              }),
            mapRef.current.addLayer({
                  'id': bluebikeLayerName,
                  'type': 'symbol',
                  'source': 'bluebike-stations',
                  layout: {
                    'visibility': 'visible',
                    'icon-image': 'bluebike_classic_img',
                    'icon-size': [
                        'interpolate',  // Make circles larger as the user zooms from z12 to z18.
                          ['linear'],
                          ['zoom'],
                          12, 0.5,
                          18, 2
                        ],
                    'icon-allow-overlap': true,
                  }
                })
            mapRef.current.on('click', bluebikeLayerName, (e) => {
              console.log('App/map/click/e.features[0]', e.features[0])
              console.log('App/map/click/e.features[0].geometry.coordinates', e.features[0].geometry.coordinates)

              setActiveFeature(e.features[0])
              setActiveFeatureType('bluebikeStation')
            })
            // Change the cursor to a pointer when the mouse is over the LTS layer.
            mapRef.current.on('mouseenter', bluebikeLayerName, () => {
              mapRef.current.getCanvas().style.cursor = 'pointer'
            })

            // Change it back to a pointer when it leaves.
            mapRef.current.on('mouseleave', bluebikeLayerName, () => {
              mapRef.current.getCanvas().style.cursor = '';
            })
      })});
    } else {
      console.log("Turning on " + bluebikeLayerName)
      mapRef.current.setLayoutProperty(bluebikeLayerName, 'visibility', 'visible');
    }
  } else {
    console.log("Turning off " + bluebikeLayerName)
    mapRef.current.setLayoutProperty(bluebikeLayerName, 'visibility', 'none');
  }}

  return (
    <>
      <div id='map-container' ref={mapContainerRef} >
        {/* <div className="topbar">
          Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
        </div> */}

        <Legend colorScale={COLOR_SCALE}/>

        <button className='reset-button' onClick={handleReset}>
          Reset
        </button>
        <button className='advanced-button' onClick={handleAdvancedMode}>
          <ModeToggle advancedMode={advancedMode} />
        </button>

        <div id='options-menu'>
          <h1 id='options-title'>Map Features</h1>
          <div><label className='options-layer'>
            Bike Parking: <input 
                              type="checkbox" 
                              name="bikeParkingCheckbox"
                              defaultChecked={bikeParking} 
                              onChange={e => handleBikeParking(e.target.checked)}
                            />
          </label></div>
          <div><label className='options-layer'>
            BlueBike Stations: <input 
                              type="checkbox" 
                              name="bluebikeStationCheckbox"
                              defaultChecked={bluebikeStations} 
                              onChange={e => handleBluebikeStations(e.target.checked)}
                            />
          </label></div>
        </div>

        <SideBar 
            selectedFeature={activeFeature} 
            selectedFeatureType={activeFeatureType} 
            zoom={zoom} zoomLimit={ZOOM_UNION} 
            advancedMode={advancedMode}/>

      </div>
    </>
  )
}

export default Map