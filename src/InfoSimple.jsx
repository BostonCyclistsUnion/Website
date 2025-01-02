// Layout for basic LTS info

console.log('InfoSimple entered')

const CardinalDirection = ({start, end, inverse=false}) => {
    let lonnet = end[0] - start[0]
    let latnet = end[1] - start[1]

    let angle = Math.atan(latnet / lonnet) * (180 / Math.PI) // deg

    let cd = Math.floor((angle + 22.5) / 45)

    if (inverse) {cd = cd - 4};

    switch(cd) {
        case 0:
        case 8:
        case -8:
            cd = 'East'
            break;
        case 1:
        case -7:
            cd = 'NorthEast'
            break;
        case 2:
        case -6:
            cd = 'North'
            break;
        case 3:
        case -5:
            cd = 'NorthWest'
            break;
        case 4:
        case -4:
            cd = 'West'
            break;
        case 5:
        case -3:
            cd = 'SouthWest'
            break;
        case 6:
        case -2:
            cd = 'South'
            break;
        case 7:
        case -1:
            cd = 'SouthEast'
            break;
    }

    // let output = angle + ' deg | CD: ' + cd
    return cd
    }


const InfoSimple = ({e}) => {
    const {
      name,
      highway,
      LTS_left,
      LTS_right,
      biking_permitted_left,
      biking_permitted_right,
      biking_permitted_rule_left,
      biking_permitted_rule_right,
      bike_lane_exist_left,
      bike_lane_exist_right,
      bike_lane_exist_rule_left,
      bike_lane_exist_rule_right,
      osmid
    } = e.features[0].properties

    const start = e.features[0].geometry.coordinates[0]
    const end = e.features[0].geometry.coordinates[1]

    const osmidurl = "https://www.openstreetmap.org/way/" + osmid.toString()

    return (
        <div>
            <h1>{name}</h1>
            <p>Road Type: {highway}</p>
            <table>
                <tr>
                    <th>OSM Side</th>
                    <th>Left</th>
                    <th>Right</th>
                </tr>
                <tr>
                    <th>Direction</th>
                    <th><CardinalDirection start={start} end={end}/></th>
                    <th><CardinalDirection start={start} end={end} inverse={true}/></th>
                </tr>
                <tr>
                    <td><b>LTS</b></td>
                    <td><b>{LTS_left}</b></td>
                    <td><b>{LTS_right}</b></td>
                </tr>
                <tr>
                    <td colspan="3"><b>Bike Infrastructure</b></td>
                </tr>
                <tr>
                    <td>Bike Permitted</td>
                    <td>{biking_permitted_left} <font color="gray">{biking_permitted_rule_left}</font></td>
                    <td>{biking_permitted_right} <font color="gray">{biking_permitted_rule_right}</font></td>
                </tr>
                <tr>
                    <td>Bike Lane</td>
                    <td>{bike_lane_exist_left} <font color="gray">{bike_lane_exist_rule_left}</font></td>
                    <td>{bike_lane_exist_right} <font color="gray">{bike_lane_exist_rule_right}</font></td>
                </tr>
                <tr>
                    <td>OSMid</td>
                    <td><a href={osmidurl} target="_blank">{osmid}</a></td>
                </tr>
            </table>
        </div>
    )
}

export default InfoSimple