// Layout for basic LTS info

console.log('InfoSimple loaded')

export const CardinalDirection = ({start, end, inverse=false}) => {
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
        console.log('number')
        lonstart = start[0];
        lonend = end[0];
        latstart = start[1];
        latend = end[1];
    } else if (typeof(start[0]) === 'object') {
        console.log('object')
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

const TextLTS = ({ltsValue}) => {
    let textValue = 'Unknown LTS Value: ' + ltsValue

    switch (Number(ltsValue)) {
        case 1:
            textValue = '1 - Carefree'
            break
        case 2:
            textValue = '2 - Easygoing'
            break
        case 3:
            textValue = '3 - Tense'
            break
        case 4:
            textValue = '4 - White Knuckles'
            break
        case 0:
            textValue = 'Biking not permitted'
            break
    }
    return textValue
}


const InfoSimple = ({selectedFeature}) => {
    console.log('InfoSimple/selectedFeature:', selectedFeature)
    const {
      name,
    //   highway,
      LTS_fwd,
      LTS_rev,
      bike_allowed_fwd,
      bike_allowed_rev,
      bike_lane_fwd,
      bike_lane_rev,
      separation_fwd,
      separation_rev,
      oneway
    } = selectedFeature.properties

    const start = selectedFeature.geometry.coordinates[0]
    const end = selectedFeature.geometry.coordinates.at(-1)
    console.log('selectedFeature.geometry.coordinates', selectedFeature.geometry.coordinates)

    const allowed_fwd = (bike_allowed_fwd === 'True');
    const allowed_rev = (bike_allowed_rev === 'True');

    const dir_fwd = <CardinalDirection start={start} end={end}/>
    const dir_rev = <CardinalDirection start={start} end={end} inverse={true}/>

    console.log('name:', name)

    console.log('allowed_fwd:', allowed_fwd, ' | allowed_rev:', allowed_rev)
    console.log('oneway:', oneway)

    return (
        <div>
            <h1 className='tableStreetName'>{name}</h1>
            <div className='tableContainer'>
            <table>
                <thead>
                    <tr>
                        {allowed_rev && <th>{dir_rev}</th>}
                        {allowed_fwd && <th>{dir_fwd}</th>}
                    </tr>
                </thead>

                <tbody className='tableBox'>
                    <tr><td className='tableDescription' colSpan="2">Biking Stress Level</td></tr>
                    <tr>
                        {allowed_rev && <td className='tableValue'><TextLTS ltsValue={LTS_rev} /></td>}
                        {allowed_fwd && <td className='tableValue'><TextLTS ltsValue={LTS_fwd} /></td>}
                    </tr>

                    <tr><td className='tableDescription' colSpan="2">Bike Lane</td></tr>
                    <tr>
                        {allowed_rev && <td className='tableValue'>{bike_lane_rev}</td>}
                        {allowed_fwd && <td className='tableValue'>{bike_lane_fwd}</td>}
                    </tr>

                    <tr><td className='tableDescription' colSpan="2">Bike Lane Separation</td></tr>
                    <tr>
                        {allowed_rev && <td className='tableValue'>{separation_rev}</td>}
                        {allowed_fwd && <td className='tableValue'>{separation_fwd}</td>}
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default InfoSimple