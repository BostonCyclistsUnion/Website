
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

function featureClick (mapRef, layerID, featureID) {
    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    mapRef.current.on('click', layerID, (e) => {
        console.log('MapLayers/click/e.features[0]', e.features[0])
        console.log('MapLayers/click/e.features[0].geometry.coordinates', e.features[0].geometry.coordinates)

        setActiveFeature(e.features[0])
        setActiveFeatureType(featureID)
        // console.log('App/map/click/e.features[0].id', e.features[0].id)
        mapRef.current.setFilter(layerID+'-selected', ['in', 'osmid', e.features[0].id]);
    });
}

export function layerLTS (mapRef) {
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
          },
          layout: {
            'visibility': 'visible'
          },
          filter: ['in', 'LTS', 1,2,3,4],
      },
      // 'road-label-simple' // Add layer below labels
      )

      // Add selected LTS segment layer
      mapRef.current.addLayer({
          'id': 'lts-layer-selected',
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
        },
        // 'road-label-simple'
      );

      // Change the cursor to a pointer when the mouse is over the LTS layer.
      mapRef.current.on('mouseenter', 'lts-layer', () => {
        mapRef.current.getCanvas().style.cursor = 'pointer'
      })

      // Change it back to a pointer when it leaves.
      mapRef.current.on('mouseleave', 'lts-layer', () => {
        mapRef.current.getCanvas().style.cursor = '';
      })

      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      mapRef.current.on('click', 'lts-layer', (e) => {
        console.log('App/map/click/e.features[0]', e.features[0])
        console.log('App/map/click/e.features[0].geometry.coordinates', e.features[0].geometry.coordinates)

        setActiveFeature(e.features[0])
        setActiveFeatureType('lts')
        // console.log('App/map/click/e.features[0].id', e.features[0].id)
        mapRef.current.setFilter('lts-layer-selected', ['in', 'osmid', e.features[0].id]);
      });

}

export function layerIntersections (mapRef, intersectionsLayerName, intersections_json, COLOR_SCALE) {
  mapRef.current.addSource('intersections', {
          type: 'geojson',
          // Use a URL for the value for the `data` property.
          data: intersections_json
      }),
  mapRef.current.addLayer({
          'id': intersectionsLayerName,
          'type': 'circle',
          'source': 'intersections',
          'paint': {
              // 'circle-radius': 5,
              'circle-radius': [
                'interpolate',  // Make circles larger as the user zooms from z12 to z18.
                  ['exponential', 1.75],
                  ['zoom'],
                  12, 6,
                  18, 20
                ],
              'circle-stroke-width': 1,
              // 'circle-color': COLOR_SCALE[3],
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
  mapRef.current.on('click', intersectionsLayerName, (e) => {
    console.log('App/map/click/e.features[0]', e.features[0])
    console.log('App/map/click/e.features[0].geometry.coordinates', e.features[0].geometry.coordinates)

    setActiveFeature(e.features[0])
    setActiveFeatureType('intersections')
  })

  hoverMousePointer(mapRef, intersectionsLayerName)

}

export function layerBikeParking (mapRef, bikeParkingLayerName, bike_parking_json, COLOR_SCALE) {
  mapRef.current.addSource('bike-parking', {
          type: 'geojson',
          // Use a URL for the value for the `data` property.
          data: bike_parking_json
      }),
  mapRef.current.addLayer({
          'id': bikeParkingLayerName,
          'type': 'circle',
          'source': 'bike-parking',
          // minzoom: 13,
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

  // mapRef.current.addLayer({
  //         id: bikeParkingLayerName+'-heat',
  //         type: 'heatmap',
  //         source: 'bike-parking',
  //         // maxzoom: HEATMAP_ZOOM_MAX,
  //         layout: {
  //           'visibility': 'visible'
  //         },
  //         paint: {
  //           // Increase the heatmap weight based on frequency and property magnitude
  //           // 'heatmap-weight': [
  //           //   'interpolate',
  //           //   ['linear'],
  //           //   ['get', 'capacity'],
  //           //   0,
  //           //   0,
  //           //   6,
  //           //   1
  //           // ],
  //           // Increase the heatmap color weight weight by zoom level
  //           // heatmap-intensity is a multiplier on top of heatmap-weight
  //           'heatmap-intensity': [
  //             'interpolate',
  //             ['linear'],
  //             ['zoom'],
  //             0,
  //             1,
  //             HEATMAP_ZOOM_MIN,
  //             3
  //           ],
  //           // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
  //           // Begin color ramp at 0-stop with a 0-transparancy color
  //           // to create a blur-like effect.
  //           'heatmap-color': [
  //             'interpolate',
  //             ['linear'],
  //             ['heatmap-density'],
  //             0,
  //             'rgba(33,102,172,0)',
  //             // 0.2,
  //             // 'rgb(103,169,207)',
  //             0.4,
  //             'rgb(209,229,240)',
  //             0.6,
  //             'rgb(253,219,199)',
  //             0.8,
  //             'rgb(239,138,98)',
  //             1,
  //             'rgb(178,24,43)'
  //           ],
  //           // Adjust the heatmap radius by zoom level
  //           // 'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 1, HEATMAP_ZOOM_MIN, 9, HEATMAP_ZOOM_MAX],
  //           'heatmap-radius': 10,
  //           // Transition from heatmap to circle layer by zoom level
  //           'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], HEATMAP_ZOOM_MIN, 0.9, HEATMAP_ZOOM_MAX, 0]
  //         },
  //         // slot: 'top'
  // });

  mapRef.current.on('click', bikeParkingLayerName, (e) => {
    console.log('App/map/click/e.features[0]', e.features[0])
    console.log('App/map/click/e.features[0].geometry.coordinates', e.features[0].geometry.coordinates)

    setActiveFeature(e.features[0])
    setActiveFeatureType('bikeParking')
  })
  
  hoverMousePointer (mapRef, bikeParkingLayerName)
}

export function layerBlueBikes (mapRef, bluebikeLayerName, bluebikeStationsGeojson) {
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
  })
}