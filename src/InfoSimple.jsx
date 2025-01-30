// Layout for basic LTS info

console.log('InfoSimple loaded')

export const CardinalDirection = ({start, end, inverse=false}) => {
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

const TextLTS = ({ltsValue}) => {
    let textValue = 'Unknown LTS Value: ' + ltsValue

    switch (ltsValue) {
        case 1:
            textValue = 'Carefree'
            break
        case 2:
            textValue = 'Easygoing'
            break
        case 3:
            textValue = 'Tense'
            break
        case 4:
            textValue = 'White Knuckles'
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
      bike_lane_separation_left,
      bike_lane_separation_right,
      osmid
    } = selectedFeature.properties

    const start = selectedFeature.geometry.coordinates[0]
    const end = selectedFeature.geometry.coordinates[1]

    const osmidurl = "https://www.openstreetmap.org/way/" + osmid.toString()

    return (
        <div>
            <h1 className='tableStreetName'>{name}</h1>
            <div className='tableContainer'>
            <table>
                <thead>
                    <tr>
                        <th className='tableDirection'><CardinalDirection start={start} end={end}/></th>
                        <th className='tableDirection'><CardinalDirection start={start} end={end} inverse={true}/></th>
                    </tr>
                </thead>

                <tbody className='tableBox'>
                    <tr><td className='tableDescription' colSpan="2">Biking Stress Level</td></tr>
                    <tr>
                        <td className='tableValue'><TextLTS ltsValue={LTS_left} /></td>
                        <td className='tableValue'><TextLTS ltsValue={LTS_right} /></td>
                    </tr>

                    <tr><td className='tableDescription' colSpan="2">Bike Lane</td></tr>
                    <tr>
                        <td className='tableValue'>{bike_lane_exist_left}</td>
                        <td className='tableValue'>{bike_lane_exist_right}</td>
                    </tr>

                    <tr><td className='tableDescription' colSpan="2">Bike Lane Separation</td></tr>
                    <tr>
                        <td className='tableValue'>{bike_lane_separation_left}</td>
                        <td className='tableValue'>{bike_lane_separation_right}</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default InfoSimple