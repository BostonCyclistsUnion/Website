import type { OverpassJson } from "overpass-ts";
import { overpassJson } from "overpass-ts";
// import { strict as assert } from 'assert';
import osmtogeojson from "osmtogeojson"

export default async function Overpass() {
  console.log('Fetching bike parking through overpass');
  const query = `[out:json][timeout:25]; (area["wikipedia"="en:Boston"];area["wikipedia"="en:Cambridge, Massachusetts"];)->.searchArea; nwr["amenity"="bicycle_parking"](area.searchArea); out geom;`
  // var osmtogeojson = require('osmtogeojson');

  // json request
  // overpassJson(query).then((json) => {
  //   console.log('Recieved data from overpass');
  //   json = json as OverpassJson; // cast correct response type based on query
  //   let geojson = osmtogeojson(json)
  //   console.log(geojson)
  //   return geojson
  // });

  let json = overpassJson(query)
  // json = await json as OverpassJson; // cast correct response type based on query
  let geojson = osmtogeojson(await json)
  console.log(geojson)
  return geojson
}
