// Calculate the bearing direction of a given way

export const Bearing = ({start, end, inverse=false}) => {
    // math from: 
    //      https://www.movable-type.co.uk/scripts/latlong.html
    //      https://stackoverflow.com/questions/46590154/calculate-bearing-between-2-points-with-javascript

    // Converts from degrees to radians.
    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    };
    
    // Converts from radians to degrees.
    function toDegrees(radians) {
        return radians * 180 / Math.PI;
    }
  

    // console.log('typeof(start[0]):', typeof(start[0]))
    // console.log("typeof(start[0] === 'number')", typeof(start[0]) === 'number')
    var lonstart
    var lonend
    var latstart
    var latend

    if (typeof(start[0]) === 'number') {
        // console.log('number')
        lonstart = start[0];
        lonend = end[0];
        latstart = start[1];
        latend = end[1];
    } else if (typeof(start[0]) === 'object') {
        // console.log('object')
        lonstart = start[0][0];
        lonend = end[0][0];
        latstart = start[0][1];
        latend = end[0][1];
    }
    // let lonnet = end[0] - start[0]
    // let latnet = end[1] - start[1]

    // let lonnet = lonend - lonstart
    // let latnet = latend - latstart

    // console.log('start:', lonstart, latstart)
    // console.log('end:', lonend, latend)

    latstart = toRadians(latstart);
    lonstart = toRadians(lonstart);
    latend = toRadians(latend);
    lonend = toRadians(lonend);

    let y = Math.sin(lonend - lonstart) * Math.cos(latend);
    let x = Math.cos(latstart) * Math.sin(latend) - Math.sin(latstart) * Math.cos(latend) * Math.cos(lonend - lonstart);
    let brng = Math.atan2(y, x);
    let angle = (toDegrees(brng) + 360) % 360;

    // let angle = Math.atan(latnet / lonnet) * (180 / Math.PI) // deg

    let cd = Math.floor((angle + 22.5) / 45)

    if (inverse) {cd = cd - 4};

    switch(cd) {
        case 0:
        case 8:
        case -8:
            cd = 'North'
            break;
        case 1:
        case -7:
            cd = 'NorthEast'
            break;
        case 2:
        case -6:
            cd = 'East'
            break;
        case 3:
        case -5:
            cd = 'SouthEast'
            break;
        case 4:
        case -4:
            cd = 'South'
            break;
        case 5:
        case -3:
            cd = 'SouthWest'
            break;
        case 6:
        case -2:
            cd = 'West'
            break;
        case 7:
        case -1:
            cd = 'NorthWest'
            break;
    }

    // let output = angle + ' deg | CD: ' + cd
    // let dellat = latend-latstart
    // let dellon = lonend-lonstart
    // let delnorm = Math.sqrt(dellat**2 + dellon**2)

    // console.log('start:', lonstart, latstart)
    // console.log('end:', lonend, latend)
    // console.log('delta (lon/lat):', dellon/delnorm, dellat/delnorm)
    // console.log('angle:', angle, ' | cd:', cd, ' | inverse:', inverse)
    // console.log('net: ', lonnet, latnet)
    return cd
    }

export default Bearing