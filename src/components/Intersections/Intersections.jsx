import csv2geojson from "csv2geojson"

export default async function Intersections() {
    console.log('Fetching intersection data from google');
    let csvurl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT-8X_V7FUnDhcID9UGouljx_X0rMg5PAdM7lLwl1PmKXlB43sVIsurplO3qnjN3OE3_YEar4qUZzm7/pub?output=csv'

    // async function fetchCSV(url) {
    //     try {
    //         const response = await fetch(url);
    //         const data = await response.text();
    //         console.log('CSV retrieved')
    //         console.log(data)
    //         return data
    //     } catch (error) {
    //         console.error('Error fetching CSV:', error);
    //     }
    //     }

    // let csvdata = fetchCSV(csvurl);

    const response = await fetch(csvurl);
    const csvdata = await response.text();
    console.log('CSV retrieved')
    // console.log(csvdata)

    csv2geojson.csv2geojson(await csvdata, {
        latfield: 'lat',
        lonfield: 'long',
        delimiter: ','
        }, function(err, data) {
            console.log('csv2geojson function', err, data)
            return data
    }); 

    // console.log('geojson from csv:')
    // console.log(geojson)

    // return geojson
}