import csv2geojson from "csv2geojson"

export default async function Intersections() {
    console.log('Fetching intersection data from google');
    let csvurl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT-8X_V7FUnDhcID9UGouljx_X0rMg5PAdM7lLwl1PmKXlB43sVIsurplO3qnjN3OE3_YEar4qUZzm7/pub?output=csv'

    const response = await fetch(csvurl);
    const csvdata = await response.text();
    // console.log('CSV retrieved', await csvdata)
    console.log('CSV retrieved')

    let geojsontest
    
    csv2geojson.csv2geojson(await csvdata, {
        latfield: 'lat',
        lonfield: 'lon',
        delimiter: ','
        }, function(err, data) {
            // console.log('csv2geojson function', err, data)
            geojsontest = data
            return geojsontest
    }); 
    // console.log('geojsontest from csv', await geojsontest)

    return await geojsontest
}