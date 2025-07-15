import { useRef, useEffect, useState } from 'react'
// import { renderToStaticMarkup } from 'react-dom/server';
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'

import Legend from './Legend';
import SideBar, {ModeToggle} from './components/selection/SideBar'
// import {ModeToggle} from './components/selection/SideBar'

import { 
  layerIntersections, 
  layerLTS,
  layerBikeParking,
  layerBlueBikes,
} from './components/MapLayers/MapLayers';

// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/

const INITIAL_CENTER = [-71.0809, 42.3473]
const INITIAL_ZOOM = 12
const MAX_ZOOM = 20
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
  
  const [displayLTS, setLTS] = useState(true);
  const [displayLTS1, setLTS1] = useState(true);
  const [displayLTS2, setLTS2] = useState(true);
  const [displayLTS3, setLTS3] = useState(true);
  const [displayLTS4, setLTS4] = useState(true);
  // console.log('displayLTS:', displayLTS);
  const [displayIntersections, setIntersections] = useState(false);
  // console.log('displayIntersections:' + displayIntersections)
  const [displayBikeParking, setBikeParking] = useState(false);
  // handleBikeParking(displayBikeParking)
  // console.log('displayBikeParking:' + displayBikeParking)
  const [displayBluebikeStations, setBluebikeStations] = useState(false);
  // handleBluebikeStations(displayBluebikeStations)
  // console.log('displayBluebikeStations is created and set to ' + displayBluebikeStations))

  var ltsLayerName = 'lts-layer'
  var intersectionsLayerName = 'intersections-layer'
  var bikeParkingLayerName = 'bike_parking-layer'
  var bluebikeLayerName = 'bluebike-layer'

  const loadLayers = (ltsLayerName, bikeParkingLayerName, bluebikeLayerName, intersectionsLayerName) => {
    console.log('loadLayers', displayLTS, displayBikeParking, displayBluebikeStations, displayIntersections)
    if (displayLTS) {
      layerLTS(mapRef, ltsLayerName, COLOR_SCALE, LINE_WIDTH, setActiveFeature, setActiveFeatureType)
    }
    if (displayBikeParking) {
      layerBikeParking(mapRef, bikeParkingLayerName, COLOR_SCALE, setActiveFeature, setActiveFeatureType)
    }
    if (displayBluebikeStations) {
      layerBlueBikes(mapRef, bluebikeLayerName, COLOR_SCALE, setActiveFeature, setActiveFeatureType)
    }
    if (displayIntersections) {
      layerIntersections(mapRef, intersectionsLayerName, displayIntersections, COLOR_SCALE, setActiveFeature, setActiveFeatureType)
    }
  };

  const mapRef = useRef()
  const mapContainerRef = useRef()

  const [center, setCenter] = useState(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)

  const handleAdvancedMode = () => {
    console.log('advancedMode switched from', advancedMode);
    setAdvancedMode(advancedMode => !advancedMode);
  }
  
  const handleLTS1 = () => {
    console.log('displayLTS1 switched from', displayLTS1);
    setLTS1(displayLTS1 => !displayLTS1);
    setLTSfilter(1)
  }
  const handleLTS2 = () => {
    console.log('displayLTS2 switched from', displayLTS2);
    setLTS2(displayLTS2 => !displayLTS2);
    setLTSfilter(2)
  }
  const handleLTS3 = () => {
    console.log('displayLTS3 switched from', displayLTS3);
    setLTS3(displayLTS3 => !displayLTS3);
    setLTSfilter(3)
  }
  const handleLTS4 = () => {
    console.log('displayLTS4 switched from', displayLTS4);
    setLTS4(displayLTS4 => !displayLTS4);
    setLTSfilter(4)
  }
  const setLTSfilter = (level) => {
    let ltsFilter = mapRef.current.getFilter(ltsLayerName)
    // console.log('ltsFilter', ltsFilter)
    if (ltsFilter.includes(level)) {
      const index = ltsFilter.indexOf(level);
      ltsFilter.splice(index, 1); // 2nd parameter means remove one item only
    } else {
      ltsFilter.push(level)
    }
    mapRef.current.setFilter(ltsLayerName, ltsFilter);
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

    let q = 1

    mapRef.current.on('load', function () {
      loadLayers(ltsLayerName, bikeParkingLayerName, bluebikeLayerName, intersectionsLayerName)
      
      // get the current center coordinates and zoom level from the map
      mapRef.current.on('move', () => {
        const mapCenter = mapRef.current.getCenter()
        const mapZoom = mapRef.current.getZoom()

        // update state
        setCenter([ mapCenter.lng, mapCenter.lat ])
        setZoom(mapZoom)
      })

      // Add fullscreen button
      mapRef.current.addControl(new mapboxgl.FullscreenControl());
    })

    mapRef.current.on('style.load', () => {
        loadLayers(ltsLayerName, bikeParkingLayerName, bluebikeLayerName, intersectionsLayerName)
    });

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
    mapRef.current.setFilter(ltsLayerName+'-selected', ['in', 'osmid', '']);
  }

  const handleLayerCheckbox = (checkboxState, setState, displayState, layerID) => {
    setState(checkboxState => !checkboxState)
    console.log(layerID + ' checkbox changed to ' + !displayState);

    if(checkboxState) {
      if(typeof mapRef.current.getLayer(layerID) == 'undefined') {
        if (layerID == intersectionsLayerName) {
          layerIntersections(mapRef, intersectionsLayerName, displayIntersections, COLOR_SCALE, setActiveFeature, setActiveFeatureType)
        } else if (layerID == bikeParkingLayerName) {
          layerBikeParking(mapRef, bikeParkingLayerName, COLOR_SCALE, setActiveFeature, setActiveFeatureType)
        } else if (layerID == bluebikeLayerName) {
          layerBlueBikes(mapRef, bluebikeLayerName, COLOR_SCALE, setActiveFeature, setActiveFeatureType)
        } else if (layerID == ltsLayerName) {
          layerLTS(mapRef, ltsLayerName, COLOR_SCALE, LINE_WIDTH, setActiveFeature, setActiveFeatureType)
        } 
      }
      console.log("Turning on " + layerID)
      mapRef.current.setLayoutProperty(layerID, 'visibility', 'visible');
      if(typeof mapRef.current.getLayer(layerID+'selected') != 'undefined') {
        mapRef.current.setLayoutProperty(layerID+'selected', 'visibility', 'visible');}
    } else {
      console.log("Turning off " + layerID)
      mapRef.current.setLayoutProperty(layerID, 'visibility', 'none');
      if(typeof mapRef.current.getLayer(layerID+'selected') != 'undefined') {
        mapRef.current.setLayoutProperty(layerID+'selected', 'visibility', 'none');}
    }
  }

  return (
    <>
      <div id='map-container' ref={mapContainerRef} >
        {/* <div className="topbar">
          Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
        </div> */}

        <Legend 
          colorScale={COLOR_SCALE}
          lts_display={displayLTS}
          lts1_display={displayLTS1}
          lts2_display={displayLTS2}
          lts3_display={displayLTS3}
          lts4_display={displayLTS4}
          handleLTS1={handleLTS1}
          handleLTS2={handleLTS2}
          handleLTS3={handleLTS3}
          handleLTS4={handleLTS4}
        />

        <button className='reset-button' onClick={handleReset}>
          Reset
        </button>
        <button className='advanced-button' onClick={handleAdvancedMode}>
          <ModeToggle advancedMode={advancedMode} />
        </button>

        <div id='options-menu'>
          <h1 id='options-title'>Map Features</h1>
          <div><label className='options-layer'>
            <input 
              type="checkbox" 
              name="ltsCheckbox"
              defaultChecked={displayLTS} 
              onChange={e => handleLayerCheckbox(
                e.target.checked, setLTS, displayLTS, ltsLayerName)}
            />
            Stress Map
          </label></div>
          <div><label className='options-layer'>
            <input 
              type="checkbox" 
              name="bikeParkingCheckbox"
              defaultChecked={displayIntersections} 
              onChange={e => handleLayerCheckbox(
                e.target.checked, setIntersections, displayIntersections, intersectionsLayerName)}
            />
            Intersection Audits
          </label></div>
          <div><label className='options-layer'>
            <input 
              type="checkbox" 
              name="bikeParkingCheckbox"
              defaultChecked={displayBikeParking} 
              onChange={e => handleLayerCheckbox(
                e.target.checked, setBikeParking, displayBikeParking, bikeParkingLayerName)}
            />
            Bike Parking
          </label></div>
          <div><label className='options-layer'>
            <input 
              type="checkbox" 
              name="bluebikeStationCheckbox"
              defaultChecked={displayBluebikeStations} 
              onChange={e => handleLayerCheckbox(
                e.target.checked, setBluebikeStations, displayBluebikeStations, bluebikeLayerName)}
            />
            BlueBike Stations
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