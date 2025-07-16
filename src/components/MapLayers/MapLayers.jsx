import Overpass from '../Overpass/overpass';
import Bluebikes from '../GBFS/GBFS';
import Intersections from '../Intersections/Intersections';

function hoverMousePointer (mapRef, layerID) {
    // Change the cursor to a pointer when the mouse is over the LTS layer.
    mapRef.current.on('mouseenter', layerID, () => {
    mapRef.current.getCanvas().style.cursor = 'pointer'
    })

    // Change it back to a pointer when it leaves.
    mapRef.current.on('mouseleave', layerID, () => {
    mapRef.current.getCanvas().style.cursor = '';
    })
}

function featureClick (mapRef, layerID, featureID, setActiveFeature, setActiveFeatureType) {
    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    mapRef.current.on('click', layerID, (e) => {
        console.log('MapLayers/click/e.features[0]', e.features[0])
        console.log('MapLayers/click/e.features[0].geometry.coordinates', e.features[0].geometry.coordinates)

        setActiveFeature(e.features[0])
        setActiveFeatureType(featureID)
        // console.log('App/map/click/e.features[0].id', e.features[0].id)

        // Update the filter on highlighting the selected object
        if(typeof mapRef.current.getLayer(layerID+'-selected') != 'undefined') {
          mapRef.current.setFilter(layerID+'-selected', ['in', 'osmid', e.features[0].id]);
        }
    });
}

export function layerLTS (  mapRef, ltsLayerName, 
                            COLOR_SCALE, LINE_WIDTH, 
                            setActiveFeature, setActiveFeatureType
                          ) {
    // console.log('layerLTS | ' + mapRef.current.getSource('LTS_source'))
    if (typeof mapRef.current.getSource('LTS_source') == 'undefined') {
      // console.log('adding LTS_source')
      mapRef.current.addSource('LTS_source', {
        type: 'vector',
        url: 'mapbox://skilcoyne.stressmap_tiles'
    })}

    // Add LTS data layer
    if(typeof mapRef.current.getLayer(ltsLayerName) == 'undefined') {
      mapRef.current.addLayer({
        'id': ltsLayerName,
        "type": "line",
        'source': 'LTS_source',
        'source-layer': 'lts', 
        'slot': 'middle',// replaces 'road-label-simple' which seems to work for light-v11 but not standard style
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
        },
        layout: {
          'visibility': 'visible'
        },
        filter: ['in', 'LTS', 1,2,3,4],
    })}

    // Add selected LTS segment layer
    if(typeof mapRef.current.getLayer(ltsLayerName + '-selected') == 'undefined') {
      mapRef.current.addLayer({
        'id': ltsLayerName + '-selected',
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
        filter: ['in', 'osmid', ''],
        layout: {
          'visibility': 'visible'
        }
    })}

    hoverMousePointer(mapRef, ltsLayerName)
    featureClick(mapRef, ltsLayerName, 'lts', setActiveFeature, setActiveFeatureType)

}

export function layerIntersections (mapRef, 
                                    intersectionsLayerName, displayIntersections,
                                    COLOR_SCALE, 
                                    setActiveFeature, setActiveFeatureType
                                  ) {
  Intersections(mapRef).then((intersections_json) => {
    if (typeof mapRef.current.getSource('intersections') == 'undefined'){
      mapRef.current.addSource('intersections', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: intersections_json
    })}
    if(typeof mapRef.current.getLayer(intersectionsLayerName) == 'undefined') {
      mapRef.current.addLayer({
        'id': intersectionsLayerName,
        'type': 'circle',
        'source': 'intersections',
        'paint': {
            'circle-radius': [
              'interpolate',  // Make circles larger as the user zooms from z12 to z18.
                ['exponential', 1.75],
                ['zoom'],
                12, 6,
                18, 20
              ],
            'circle-stroke-width': 1,
            'circle-color': [
              'match',
                ['get', 'score'],
                '6', COLOR_SCALE[0],
                '5', COLOR_SCALE[1],
                '4', COLOR_SCALE[2],
                '3', COLOR_SCALE[2],
                '2', COLOR_SCALE[3],
                '1', COLOR_SCALE[3],
                '0', COLOR_SCALE[3],
                COLOR_SCALE[3],
              ],
            'circle-stroke-color': 'white'
        },
        layout: {
          'visibility': 'visible'
        }
    })

      hoverMousePointer(mapRef, intersectionsLayerName)
      featureClick(mapRef, intersectionsLayerName, 'intersections', setActiveFeature, setActiveFeatureType)
    }
})}

export function layerBikeParking (mapRef, 
                                  bikeParkingLayerName,                                   COLOR_SCALE,
                                  setActiveFeature, setActiveFeatureType
                                ) {
  Overpass(mapRef).then((bike_parking_json) => {
    if (typeof mapRef.current.getSource('bike-parking') == 'undefined'){
      mapRef.current.addSource('bike-parking', {
              type: 'geojson',
              // Use a URL for the value for the `data` property.
              data: bike_parking_json
    })}
    if(typeof mapRef.current.getLayer(bikeParkingLayerName) == 'undefined') {
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
    })}
    
    hoverMousePointer(mapRef, bikeParkingLayerName)
    featureClick(mapRef, bikeParkingLayerName, 'bikeParking', setActiveFeature, setActiveFeatureType)
})}

export function layerBlueBikes (mapRef, 
                                bluebikeLayerName,
                                setActiveFeature, setActiveFeatureType
                              ) {
  Bluebikes().then((bluebikeStationsGeojson) => {
    // console.log('bluebikeStationsGeojson', bluebikeStationsGeojson)
    console.log('bluebikeStationsGeojson loaded')
    mapRef.current.loadImage('/bluebike_classic.png', (error, image) => {
      if (error) throw error;
      // Add the loaded image to the style's sprite.
      mapRef.current.addImage('bluebike_classic_img', image);

      if (typeof mapRef.current.getSource('bluebike-stations') == 'undefined'){
        mapRef.current.addSource('bluebike-stations', {
          type: 'geojson',
          data: bluebikeStationsGeojson
      })}
      if(typeof mapRef.current.getLayer(bluebikeLayerName) == 'undefined') {
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
      })}

      hoverMousePointer(mapRef, bluebikeLayerName)
      featureClick(mapRef, bluebikeLayerName, 'bluebikeStation', setActiveFeature, setActiveFeatureType)
    })
})}