import type { OverpassJson } from "overpass-ts";
import { overpassJson } from "overpass-ts";
// import { strict as assert } from 'assert';
import osmtogeojson from "osmtogeojson"

export default async function Overpass() {
  console.log('Fetching bike parking through overpass');
  const query = `[out:json][timeout:25]; 
                  (
                    area["wikipedia"="en:Boston"];
                    area["wikipedia"="en:Cambridge, Massachusetts"];
                    area["wikipedia"="en:Brookline, Massachusetts"];
                    area["wikipedia"="en:Somerville, Massachusetts"];
                  )->.searchArea; nwr["amenity"="bicycle_parking"](area.searchArea); 
                out geom;`

  let json = overpassJson(query)
  let geojson = osmtogeojson(await json)
  console.log(geojson)
  return geojson
}
