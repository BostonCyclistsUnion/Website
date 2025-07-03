/*
Retrieve Bluebike station data from the GBFS feed

Based on https://gist.github.com/dschep/c987bead83b9c0513c32344d38e4fdf4
*/
import jmespath from 'jmespath'

async function gbfs(info, stat) {
    // console.log('info',info)
    // console.log('stat',stat)
    let infojson = await info.json()
    let statjson = await stat.json()
    let infoGeoJSON = jmespath.search(infojson, '{type: `FeatureCollection`, features: data.stations[*].{id: station_id, geometry: {type: `Point`, coordinates: [lon, lat]}, properties: @}}');
    let statGeoJSON = jmespath.search(statjson, '{type: `FeatureCollection`, features: data.stations[*].{id: station_id, properties: @}}');

    // console.log('infoGeoJSON',infoGeoJSON)
    // console.log('statGeoJSON',statGeoJSON)

    const statMap = new Map(statGeoJSON.features.map(({id, properties}) => [id, properties]));
    infoGeoJSON.features = infoGeoJSON.features.map(({id, geometry, properties}) => ({
        id,
        geometry,
        properties: Object.assign({}, properties, statMap.get(id)),
        }));
    // console.log('infoGeoJSON', infoGeoJSON)
    return infoGeoJSON;
}

export default async function Bluebikes() {
    console.log('Fetching BlueBike data');
    const station_info = 'https://gbfs.lyft.com/gbfs/1.1/bos/en/station_information.json'
    const station_status = 'https://gbfs.lyft.com/gbfs/1.1/bos/en/station_status.json'

    let station_info_json = await fetch(station_info, {cors: true})
    let station_status_json = await fetch(station_status, {cors: true})

    let bluebikegeojson = gbfs(await station_info_json, await station_status_json)
    return bluebikegeojson
}
